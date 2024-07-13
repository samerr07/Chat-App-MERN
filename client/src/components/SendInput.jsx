import axios from 'axios';
import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import { BASE_URL } from '../utility/config';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

const SendInput = () => {

  const [message, setMessage] = useState("")
  const {selectedUser} = useSelector((state)=>state.user)
  const {messages} = useSelector((state)=>state.message)
  const dispatch = useDispatch()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
        axios.defaults.withCredentials = true
        const res = await axios.post(`${BASE_URL}/message/send/${selectedUser?._id}`,{message},{
          headers:{
            "Content-Type":"application/json"
          },
        })
        console.log(res?.data)
        dispatch(setMessages([...messages,res?.data?.newMessage]))
    }catch(err){
      console.log(err)
    }
    setMessage("")
  }
  return (
    <form onSubmit={handleSubmit}  className='px-4 py-3'>
        <div className='w-full relative'>
            <input 
            onChange={(e)=>setMessage(e.target.value)}
            value={message}
            className='border p-3 text-sm rounded-lg block w-full border-zinc-500 bg-gray-600 text-white'
            type="text" placeholder="Send a Message..." />
            <button type='submit' className='absolute flex inset-y-0 end-0 items-center pr-4'>
                <IoSend />
            </button>
        </div>
    </form>
  )
}

export default SendInput
