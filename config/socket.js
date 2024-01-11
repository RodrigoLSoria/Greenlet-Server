const FRONTEND_URL = "http://localhost:5173" || "https://greenlet.netlify.app"

const { Server: SocketServer } = require('socket.io')

const socket = (server) => {
    const io = new SocketServer(server, {
        cors: {
            origin: [FRONTEND_URL]
        }
    })

    io.on('connection', (socket) => {
        console.log('A user has connected with id:', socket.id)

        socket.on('message', (data) => {
            console.log('Received message:', data, typeof data)
            io.emit('newMessage', data)
        })

        socket.on('disconnect', (reason) => {
            console.log(`User with id ${socket.id} has disconnected: ${reason}`)
        })
    })

}

module.exports = socket


