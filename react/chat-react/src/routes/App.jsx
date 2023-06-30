import {Outlet, redirect, useLoaderData} from 'react-router-dom'

import ContactList from '../components/ContactList'
import {AuthContext} from '../context/auth.context'
import ky from '../utils/ky'

export async function loader() {
  try {
    const user = await ky.get('user').json()
    // const users = await ky.get('users').json()

    const channels = await ky.get('channels').json()
    return {
      user,
      channels
      // users: users.filter((_user) => _user.id !== user.id)
    }
  } catch (err) {
    if (err.response.status === 401) {
      return redirect('/login')
    }
  }
}

export default function App() {
  const {user, channels} = useLoaderData()

  function handleLogout() {
    localStorage.removeItem('token')

    window.location.reload()
  }


  function handlePath() {
    let string = window.location.pathname
    if (string === '/') {
      return ''
    } else {
      let stringSize = string.length
      let actualPath = string.charAt(stringSize - 1)
      return channels[actualPath - 1].name
    }
  }

  return (
    <AuthContext.Provider value={user}>
      <div className='flex h-screen'>
        <div className='flex w-[320px] flex-col bg-[#262626]'>
          <h2 className='flex h-12 items-center justify-center text-xl font-semibold text-[#d0cfd0]'>
            Channels
          </h2>
          <ContactList channels={channels} />
          <button
            className='flex gap-x-6 w-[85%] m-auto items-center justify-center p-4 bg-[#4674fd] text-white rounded-xl mb-2.5'
            onClick={handleLogout}
            type='button'
          >
            <svg xmlns='http://www.w3.org/2000/svg' height='1em'
                 viewBox='0 0 576 512'>
              <path
                d='M320 32c0-9.9-4.5-19.2-12.3-25.2S289.8-1.4 280.2 1l-179.9 45C79 51.3 64 70.5 64 92.5V448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H96 288h32V480 32zM256 256c0 17.7-10.7 32-24 32s-24-14.3-24-32s10.7-32 24-32s24 14.3 24 32zm96-128h96V480c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H512V128c0-35.3-28.7-64-64-64H352v64z' fill='white'/>
            </svg>
            Logout
          </button>
        </div>
        <div className='flex flex-1 flex-col bg-[#1f1f1f]'>
          <h2 className='flex h-12 items-center justify-center border-b border-gray-100 text-xl font-semibold text-[#d0cfd0]'>
            "Messages of {handlePath()}"
          </h2>
          <Outlet />
        </div>
      </div>
    </AuthContext.Provider>
  )
}
