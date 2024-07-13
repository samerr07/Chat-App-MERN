import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { setMessages } from '../redux/messageSlice'

const useGetRealTimeMsg = () => {
    const {messages} = useSelector((state)=>state.message)
    const {socket} = useSelector((state)=>state.socket)
    const dispatch = useDispatch()

    useEffect(()=>{
        socket?.on("newMessage", (newMessage)=>{
            console.log(newMessage)
            dispatch(setMessages([...messages, newMessage]))
        })

        return ()=>socket?.off("newMessage")
    },[setMessages,socket,  messages])
}

export default useGetRealTimeMsg;