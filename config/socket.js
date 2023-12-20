const FRONTEND_URL = process.env.ORIGIN || 'http://localhost:3000'

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


