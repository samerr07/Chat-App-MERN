import React from 'react'
import {BiSearchAlt2} from "react-icons/bi"
import { AiOutlineLogout } from "react-icons/ai";
import OtherUsers from './OtherUsers'
import axios from 'axios';
import { BASE_URL } from '../utility/config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthUser, setOtherUser, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';

const Sidebar = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async()=>{
        try{
            axios.defaults.withCredentials = true;
            const res = await axios.get(`${BASE_URL}/user/logout`)
            navigate("/login")
            toast.success(res?.data?.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            dispatch(setAuthUser(null))
            dispatch(setOtherUser(null))
            dispatch(setMessages(null))
            dispatch(setSelectedUser(null))
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
        <form action="" className='flex items-center gap-2'>
            <input type="text"
                placeholder='Search....'
                className='input input-bordered'
            />
            <button className='btn bg-zinc-700 text-white'>
                <BiSearchAlt2 className='w-6 h-6 outline-none' size={20} />
            </button>
        </form>

        <div className="divider px-3"></div>

        <OtherUsers/>

        <div className='mt-5'>
            <button onClick={handleLogout} className='btn btn-sm'>
                Logout
                <AiOutlineLogout size={20} />
            </button>
        </div>
    </div>
  )
}

export default Sidebar



