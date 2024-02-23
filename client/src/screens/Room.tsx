import { useSocket } from "../context/SocketProvider"
import { useCallback, useEffect } from "react"


const Room = () => {
    const socket = useSocket()
    // const handleJoinedUsers = useCallback((data: any)=> {
    //     const {email, room } = data
    // }, [])

    useEffect(()=> {
        socket?.on('user:joined', (data: any)=> {
            console.log(data);
        })
    }, [socket])
  return (
    <div>
      Room Page
    </div>
  )
}

export default Room
