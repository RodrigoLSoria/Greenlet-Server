const FRONTEND_URL = process.env.ORIGIN

const { Server: SocketServer } = require('socket.io')

const socket = (server) => {
    const io = new SocketServer(server, {
        cors: {
            origin: [FRONTEND_URL]
        }
    })

    io.on('connection', (socket) => {
        // console.log('Se ha conectado un cliente', socket.id)

        socket.on('message', ({ data }) => {
            console.log('on message')
            io.emit('newMessage', (data))

        })
    })

}

module.exports = socket


