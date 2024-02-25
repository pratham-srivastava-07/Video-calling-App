import { useSocket } from "../context/SocketProvider"
import { useCallback, useEffect } from "react"


const Room = () => {
    const socket = useSocket()
    const handleJoinedUsers = useCallback((data: any)=> {
        const {email } = data
        console.log(`${email} joined the room`)
    }, [])

    useEffect(()=> {
        socket?.on('user:joined', handleJoinedUsers)
        return ()=> {
          socket?.off('user:joined', handleJoinedUsers)
        }
    }, [socket, handleJoinedUsers])
  return (
    <div>
      Room Page
    </div>
  )
}

export default Room
