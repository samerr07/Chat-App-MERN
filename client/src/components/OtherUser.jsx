import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({user}) => {

  const dispatch = useDispatch()
  const {selectedUser,onlineUsers} = useSelector((state)=>state.user)
  const onlineUser = onlineUsers?.includes(user?._id)


  const handleSelectedUser = (user)=>{
    dispatch(setSelectedUser(user))
  }
  return (
    <div>
      <div onClick={()=>handleSelectedUser(user)} className={`${selectedUser?._id === user?._id ? 'bg-zinc-200 text-zinc-900' : 'text-white'} flex items-center text-white hover:text-zinc-900 hover:bg-zinc-200 rounded-xl gap-2 p-2 cursor-pointer`}>
        <div className={`avatar ${onlineUser ? 'online' : ''}`}>
          <div className="w-12 rounded-full">
            <img
              src={user.profilePhoto}
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div>
            <p>{user.fullName}</p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </div>
  );
};

export default OtherUser;
