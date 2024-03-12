import { useSocket } from "../context/SocketProvider"
import { useCallback, useEffect, useState } from "react"
import ReactPlayer from "react-player"
import peer from "../service/peer"



const Room = () => {
  const [socketId, setSocketId] = useState(null)
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
    const socket = useSocket()
    const handleJoinedUsers = useCallback(({email, id}: {email: any, id: any})=> {
      console.log(`${email} joined the room`);
      setSocketId(id);
  }, []);
   
  const handleCall = useCallback(async ()=>{
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });
    const offer = await peer.getOffer();
    socket?.emit("call:user", {to: socketId, offer})
    setMyStream(stream);
    return stream;
  },[socketId,myStream])

  const handleIncomingCall = useCallback( async ({from, offer}: {from: any, offer: any})=> {
    setSocketId(from)
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });
    setMyStream(stream)
    console.log(`Incoming Call`, from, offer)
    const ans = await peer.getAnswer(offer)
    socket?.emit("answer:call", {to: from, ans})
  }, [socket])
 
  const handleAnswerCall = useCallback(({from, ans}: {from: any, ans: any})=> {
    peer.setDescription(ans)
    console.log(`Call accepted`, from, ans)
  }, [])

    useEffect(()=> {
        socket?.on('user:joined', handleJoinedUsers)
        socket?.on("incoming:call", handleIncomingCall)
        socket?.on("ans:call", handleAnswerCall)
        return ()=> {
          socket?.off('user:joined', handleJoinedUsers)
          socket?.on("incoming:call", handleIncomingCall)
          socket?.on("ans:call", handleAnswerCall)
        }
    }, [socket, handleIncomingCall,handleAnswerCall, handleJoinedUsers])
  return (
   <div>
     <div className="flex justify-center">
     <h1 className="text-center font-bold text-3xl">Room</h1>
    </div>
   <div className="flex justify-center">
   <h4 className="text-2xl">{socketId ? "Connected" : "No one in the room"}</h4>
   </div>
   <div className="button flex justify-center items-center">
   {socketId && <button onClick={handleCall} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
  CALL
</button>}
   </div>
   <div className="streamContainer flex justify-center items-center mt-5">
   {myStream && <ReactPlayer playing muted width={200} height={200} url={myStream}/>}
   </div>
   </div>
  )
}

export default Room
