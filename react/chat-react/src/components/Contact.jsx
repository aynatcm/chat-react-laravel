import {Link} from 'react-router-dom'

export default function Contact({channel, active, onClick}) {
  return (
    <div className='border-b border-[#d0cfd0]'>
      <Link to={`/rooms/${channel.id}`} className='text-[#c6c5c6]'>{channel.name}</Link>
    </div>
  )
}
