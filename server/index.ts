const {Server} = require('socket.io')

const io = new Server(8000, {
    cors: true,
})

const emailToSocket = new Map();
const socketIdtoEmail = new Map();

io.on("connection", (socket: any)=> {
    console.log("socket connected", socket.id);
    socket.on('room:join', (data: any)=> {
        const {email, room} = data;
        emailToSocket.set(email, socket.id);
        socketIdtoEmail.set(socket.id, email);
        io.to(room).emit('user:joined', {email, id: socket.id}) // agar pehle se koi hai to usse user joined pata chal jaega
        socket.join(room)
       io.to(socket.id).emit('room:join', data)
    })
   
    
})


// req-> middleware-> res