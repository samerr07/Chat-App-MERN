import { useEffect } from "react"
import axios from "axios"
import {BASE_URL} from "./../utility/config"
import {useDispatch} from "react-redux"
import { setOtherUser } from "../redux/userSlice"

const useGetOtherUser = ()=>{

    const dispatch = useDispatch()

    useEffect(()=>{
        
        const fetchOtherUser = async()=>{
            try{
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${BASE_URL}/user/otherUsers`)

                // console.log(res?.data?.otherUsers)
                dispatch(setOtherUser(res?.data?.otherUsers))
            }catch(err){  
                console.log(err)
            }
        }
        fetchOtherUser()
    },[])
}

export default useGetOtherUser;