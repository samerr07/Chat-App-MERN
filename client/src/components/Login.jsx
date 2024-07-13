import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BASE_URL} from "./../utility/config"
import { FaSpinner } from "react-icons/fa";
import {useDispatch} from "react-redux";
import { setAuthUser } from '../redux/userSlice';

const Login = () => {

    const [user, setUser] = useState({
        userName:"",
        password:"",
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleLogin = async(e)=>{
        e.preventDefault()
        try{
            setLoading(true)
            const res = await axios.post(`${BASE_URL}/user/login`,user,{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            })
            if(res?.data?.success){
                navigate("/")
                // toast.success(res?.data?.message)
                dispatch(setAuthUser(res?.data?.user))
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
                setLoading(false)

            }
        }catch(err){
            console.log(err)
            // toast.error(err?.response?.data?.message)
            toast.error(err?.response?.data?.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setLoading(false)
        }

        setUser({
            userName:"",
            password:"",
        })
    }
  return (
    <div className='min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
            <h1 className='text-3xl font-bold text-center'>Login</h1>
            <form onSubmit={handleLogin} action="">
                
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Username</span>
                    </label>
                    <input 
                        className='w-full input input-bordered h-10' 
                        type="text"
                        value={user.userName}
                        onChange={(e)=>setUser({...user, userName:e.target.value})}
                    />
                </div>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Password</span>
                    </label>
                    <input 
                        className='w-full input input-bordered h-10' 
                        type="text"
                        value={user.password}
                        onChange={(e)=>setUser({...user, password:e.target.value})}
                    />
                </div>
                
                

                <p className='text-center my-2'>
                    Don't have an account?
                    <Link to="/signup" >
                        SignUp
                    </Link>
                </p>

                <div>
                    <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700'>
                    {loading ? <FaSpinner className='animate-spin' /> : "Login"}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
