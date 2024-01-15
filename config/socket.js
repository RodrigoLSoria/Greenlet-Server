const FRONTEND_URL = process.env.ORIGIN || "https://greenlet.netlify.app"

const { Server: SocketServer } = require('socket.io')

const socket = (server) => {

    const io = new SocketServer(server, {
        cors: {
            origin: [FRONTEND_URL]
        }
    })

    io.on('connection', (socket) => {

        console.log(`User connected with id: ${socket.id}`);


        socket.on('message', (data) => {
            console.log("dentro del socket.js, despues de enviar un mensaje", data)
            io.emit('newMessage', (data))
        })

        socket.on('disconnect', (reason) => {
            console.log(`User with id ${socket.id} has disconnected: ${reason}`)
        })
    })

}

module.exports = socket


