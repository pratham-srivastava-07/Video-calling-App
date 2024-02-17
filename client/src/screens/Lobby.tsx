import React, { useState, useCallback } from 'react'


const Lobby = () => {
    const [email, setEmail] = useState('')
    const [room, setRoom] = useState('')
    const handleSubmit = useCallback((e: any)=> {
        e.preventDefault();
        console.log(email);
        console.log(room);
        
        
    },[email, room])
    return (
        <>
       <div className="container">
       <div className="container flex items-center justify-center ml-20 text-4xl mt-5 font-bold">
            Lobby
        </div>
        <div className="form flex items-center justify-center mt-5">
            <form onSubmit={handleSubmit} >
                <label htmlFor="email" className='text-xl ml-36'>Email ID</label>
                <input type="email" className=' m-auto p-2' placeholder='email' value={email} onChange={e=>setEmail (e.target.value)} ></input>
                <br/>
                <label htmlFor="number" className='text-xl ml-36'>Room  Number</label>
                <input type="text" className=' m-auto p-2' placeholder='room no.' value={room} onChange={e=> setRoom(e.target.value)} ></input>
                <br/>
                <button className='bg-gray-300 p-2 rounded-lg w-20 ml-48'>Join</button>
            </form>
        </div>
       </div>
        
        </>
    )
}

export default Lobby