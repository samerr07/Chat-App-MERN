import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/signup",
      element: <SignUp/>
    },
    {
      path: "/login",
      element: <Login/>
    }
  ])

  const {authUser} = useSelector((state)=>state.user)
  const {socket} = useSelector((state)=>state.socket)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(authUser){
      const socket = io("https://chat-app-mern-one-topaz.vercel.app/",{
        query:{
          userId:authUser._id
        }
      })
      dispatch(setSocket(socket))

      socket.on('getOnlineUsers',(onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      })

      return ()=>socket.close()

    } else {
      if(socket){
        socket.close();
        dispatch(setOnlineUsers(null))
      }
    }
  },[authUser])
 

  return (
    <>
      <div className='p-4 flex items-center justify-center h-screen'>
        <ToastContainer/>
        <RouterProvider router={router}/>
      </div>
    </>
  )
}

export default App
