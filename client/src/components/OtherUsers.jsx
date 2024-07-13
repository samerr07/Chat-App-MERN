import React from 'react'
import OtherUser from './OtherUser'
import useGetOtherUser from '../hooks/useGetOtherUser'
import { useSelector } from 'react-redux'

const OtherUsers = () => {

  const otherUsers = useSelector((state)=>state.user.otherUser)
  console.log(otherUsers)
  useGetOtherUser()

  return (
    <div className='overflow-auto flex-1'>
        {
          otherUsers?.map((user)=>(
            <OtherUser key={user._id} user={user}/>
          ))
        }
        
    </div>
  )
}

export default OtherUsers
