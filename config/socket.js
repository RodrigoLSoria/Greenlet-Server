const FRONTEND_URL = process.env.ORIGIN || 'https://greenlet.netlify.app'

const { Server: SocketServer } = require('socket.io')

const socket = (server) => {
    const io = new SocketServer(server, {
        cors: {
            origin: [FRONTEND_URL]
        }
    })

    io.on('connection', (socket) => {
        console.log('A user has connected.');

        socket.on('message', ({ data }) => {
            console.log('Received message:', data);
            io.emit('newMessage', data);
        })

        socket.on('disconnect', () => {
            console.log('A user has disconnected.');
        })
    })

}

module.exports = socket


