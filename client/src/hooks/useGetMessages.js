import { useEffect } from "react"
import axios from "axios"
import {BASE_URL} from "./../utility/config"
import {useDispatch, useSelector} from "react-redux"
import { setMessages } from "../redux/messageSlice"


const useGetMessages = ()=>{

    const dispatch = useDispatch()
    const {selectedUser} = useSelector((state)=>state.user)

    useEffect(()=>{
        
        const fetchMessages = async()=>{
            try{
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${BASE_URL}/message/getMessage/${selectedUser?._id}`)

                console.log(res?.data?.conversation)
                dispatch(setMessages(res?.data?.conversation?.messages))
                // dispatch(setOtherUser(res?.data?.otherUsers))
            }catch(err){  
                console.log(err)
            }
        }
        fetchMessages()
    },[selectedUser?._id,setMessages])
}

export default useGetMessages;