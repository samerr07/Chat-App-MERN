import React from 'react'
import Message from './Message'
import useGetMessages from '../hooks/useGetMessages'
import { useSelector } from 'react-redux'
import useGetRealTimeMsg from '../hooks/useGetRealTimeMsg'

const Messages = () => {

  const {messages} = useSelector((state)=>state.message)

  useGetMessages()
  useGetRealTimeMsg()

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {/* <Message/> */}
      {
        messages?.map((message)=>(
          <Message key={message._id} message={message} />
        ))
      }
    </div>
  )
}

export default Messages
