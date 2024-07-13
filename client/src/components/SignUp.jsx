import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BASE_URL} from "./../utility/config"
import { FaSpinner } from "react-icons/fa";


const SignUp = () => {

    const [user, setUser] = useState({
        fullName:"",
        userName:"",
        password:"",
        confirmPassword:"",
        gender:""
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    const handleSignUp = async(e)=>{
        e.preventDefault()
        try{
            setLoading(true)
            const res = await axios.post(`${BASE_URL}/user/register`,user,{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            })
            if(res?.data?.success){
                navigate("/login")
                // toast.success(res?.data?.message)
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
            fullName:"",
            userName:"",
            password:"",
            confirmPassword:"",
            gender:""
        })
    }

    const handleCheckbox = (genderType)=>{
        setUser({...user, gender:genderType})
    }
  return (
    <div className='min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
            <h1 className='text-3xl font-bold text-center'>SignUp</h1>
            <form onSubmit={handleSignUp} action="">
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Full Name</span>
                    </label>
                    <input 
                        className='w-full input input-bordered h-10'
                        type="text"
                        onChange={(e)=>setUser({...user,fullName:e.target.value})}
                        value={user.fullName}
                    />
                </div>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Username</span>
                    </label>
                    <input 
                        className='w-full input input-bordered h-10' 
                        type="text"
                        onChange={(e)=>setUser({...user,userName:e.target.value})}
                        value={user.userName}
                    />
                </div>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Password</span>
                    </label>
                    <input 
                        className='w-full input input-bordered h-10'
                        type="text"
                        onChange={(e)=>setUser({...user,password:e.target.value})}
                        value={user.password}
                    />
                </div>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Confirm Password</span>
                    </label>
                    <input 
                        className='w-full input input-bordered h-10' 
                        type="text"
                        onChange={(e)=>setUser({...user,confirmPassword:e.target.value})}
                        value={user.confirmPassword}
                    />
                </div>
                <div className='flex items-center my-4'>
                    <div className='flex items-center'>
                        <p>Male</p>
                        <input
                            type='checkbox'
                            className='checkbox mx-2'
                            defaultChecked
                            checked={user.gender === "male"}
                            onChange={()=>handleCheckbox("male")}
                        />
                    </div>
                    <div className='flex items-center'>
                        <p>Female</p>
                        <input
                            type='checkbox'
                            className='checkbox mx-2'
                            defaultChecked
                            checked={user.gender === "female"}
                            onChange={()=>handleCheckbox("female")}
                        />
                    </div>
                </div>

                <p className='text-center my-2'>
                    Already have an account?
                    <Link to="/login">
                        Login
                    </Link>
                </p>

                <div>
                    <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700 '>
                        {loading ? <FaSpinner className='animate-spin' /> : "SignUp"}   
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignUp
