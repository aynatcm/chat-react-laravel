import {useEffect, useRef, useState} from 'react'
import {useLoaderData, useRevalidator} from 'react-router-dom'

import MessageForm from '../components/MessageForm'
import MessageList from '../components/MessageList'
import echo from '../utils/echo'
import ky from '../utils/ky'

export async function action({params, request}) {
  const formData = await request.formData()

  await ky
    .post('messages', {
      json: {
        message: formData.get('message'),
        channel_id: params.roomId
      }
    })
    .json()

  return {}
}

export async function loader({params}) {
  const messages = await ky.get(`messages/${params.roomId}`).json()


  return {
    messages
  }

}

export default function Room() {
  const formRef = useRef(null)
  const listRef = useRef(null)
  const {messages} = useLoaderData()
  const revalidator = useRevalidator()
  const [counterMessage, setCounterMessage] = useState(0)

  useEffect(() => {
    const listener = echo
      .channel('messages')
      .listen('MessageCreated', function() {
        revalidator.revalidate()
        setCounterMessage((prevCount) => prevCount + 1)
      })

    formRef.current.reset()
    listRef.current.scrollTo(0, listRef.current.scrollHeight)

    return () => listener.stopListening('MessageCreated')
  }, [revalidator])


  useEffect(() => {
    const handleScroll = () => {
      const listElementItem = listRef.current
      const {scrollUp, offsetHeight, scrollHeight} = listElementItem
      const scrolledToBottom = scrollUp + offsetHeight >= scrollHeight

      if (scrolledToBottom) {
        setCounterMessage(0)
      }
    }

    const addScroll = () => {
      listRef.current.addEventListener('scroll', handleScroll)
    }

    const removeScroll = () => {
      listRef.current.removeEventListener('scroll', handleScroll)
    }

    const setupScrollEvents = () => {
      addScroll()
      return removeScroll
    }

    const cleanupScrollEvents = setupScrollEvents()

    return cleanupScrollEvents
  }, [])


  return (
    <div className='flex flex-1 flex-col overflow-hidden p-4'>
      <MessageList messages={messages} ref={listRef} />
      <div className='text-center text-[#fff]'>{counterMessage} mensajes sin leer</div>
      <MessageForm ref={formRef} />
    </div>
  )
}
