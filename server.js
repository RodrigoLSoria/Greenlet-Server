const app = require("./app")
const http = require('http')
const server = http.createServer(app)
const PORT = process.env.PORT || 3000


require('./config/socket')(server)


server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})
