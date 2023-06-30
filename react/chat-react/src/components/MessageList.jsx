import {forwardRef, useEffect} from 'react'

import Message from './Message'

const MessageList = forwardRef(function MessageList({messages}, ref) {

  if (messages.length === 0) {
    return (
      <>
        <div ref={ref} className='flex justify-center items-center ml-[15%] mr-[15%] pt-6 pb-6 rounded-md bg-amber-200'>
          <svg className='w-[10%]' xmlns='http://www.w3.org/2000/svg' height='1em'
               viewBox='0 0 448 512'>
            <path
              d='M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z' />
          </svg>
          <span className='w-[60%]'>Los mensajes y nada mas xd estan cifrados de extremo a extremo. Nadie fuera de este chat, ni siquiera Jesucristo, puede leerlos ni escucharlos.</span>
        </div>
      </>
    )
  }
  return (
    <div className='flex flex-1 flex-col space-y-4 overflow-y-scroll' ref={ref}>
      {
        messages.map((message) => (
          <Message key={message.id} message={message} />
        ))
      }
    </div>
  )


})

export default MessageList
