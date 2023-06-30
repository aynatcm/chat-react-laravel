import {forwardRef} from 'react'
import {Form, useParams} from 'react-router-dom'

const MessageForm = forwardRef(function MessageForm(props, ref) {
  const params = useParams()

  return (
    <Form
      action={`/rooms/${params.roomId}`}
      className="mt-4 rounded-md bg-[#353739] p-2"
      method="post"
      ref={ref}
    >
      <input
        autoFocus
        className="block w-full bg-[#353739] px-4 py-2 focus:outline-none focus:ring focus:ring-[#4674fd] text-[#8a8c92]"
        name="message"
        placeholder="Message..."
        type="text"
      />
    </Form>
  )
})

export default MessageForm
