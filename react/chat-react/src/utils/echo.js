import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

window.Pusher = Pusher

export default new Echo({
  broadcaster: 'pusher',
  key: '814720d8d58c1e24c831',
  cluster: 'us2',
  forceTLS: true,
})
