import clsx from 'clsx'

import {useUser} from '../context/auth.context'
import {useState} from 'react'

export default function Message({message}) {
  const user = useUser()
  const isAuthUser = message.sender.id === user.id
  let date = new Date(message.created_at)
  let dateConverted = date.toLocaleTimeString('en-US')

  // function getRandomColor() {
  //   let letters = '0123456789ABCDEF'
  //   let color = '#'
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)]
  //   }
  //   return color
  // }

  // const randomColor = getRandomColor()

  return (
    <div
      className={clsx('flex items-end space-x-2', {
        'self-end': isAuthUser
      })}
    >
      {!isAuthUser && (
        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-100'>
          {message.sender.name[0]}
        </div>
      )}
      <div
        className={clsx('rounded-md p-4 mr-2', {
          'rounded-bl-none bg-gray-100': !isAuthUser,
          'rounded-br-none bg-[#353739]': isAuthUser
        })}
      >
        <span className='flex flex-col min-w-[80px]'>
        <span className={clsx('text-center pb-2 font-normal', {
          'text-black': !isAuthUser,
          'text-[#c7c6c7]': isAuthUser
        })}>{message.message}</span>


          <span className={clsx('text-[11px] font-light', {
            'text-left': !isAuthUser,
            'text-right text-[#c7c6c7]': isAuthUser
          })}>
            {dateConverted}
          </span>
        </span>
      </div>
    </div>
  )
}
