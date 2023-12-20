const app = require("./app")
const http = require('http')
const server = http.createServer(app)
const PORT = 3000


require('./config/socket')(server)


server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})
