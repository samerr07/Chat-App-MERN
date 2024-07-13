import React from 'react'
import SendInput from './SendInput'
import Messages from './Messages'
import { useSelector } from 'react-redux'

const MessageContainer = () => {

  const {authUser, selectedUser, onlineUsers} = useSelector((state)=>state.user)
  const onlineUser = onlineUsers?.includes(selectedUser?._id)


  

  return (

    <>
      {
        selectedUser !== null ? (
          <div className='md:w-[550px] flex flex-col'>
      <div className="flex items-center bg-zinc-800 px-4 py-2 mb-2 text-white  gap-2  cursor-pointer">
        <div className={`avatar ${onlineUser ? 'online' : ''}`}>
          <div className="w-12 rounded-full">
            <img
              src={selectedUser?.profilePhoto}
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div>
            <p>{selectedUser?.fullName}</p>
          </div>
        </div>
      </div>
      <Messages/>
      <SendInput/>
    </div>
        ) : (
          <div className='md:w-[550px] flex flex-col justify-center items-center'>
            <h1 className='text-4xl text-white font-bold'>Hi,{authUser?.fullName}! </h1>
            <h1 className='text-2xl text-white'>Let's start conversation !!</h1>
          </div>
        )
      }
    </>
    
  )
}

export default MessageContainer
