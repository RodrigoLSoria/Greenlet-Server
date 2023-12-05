var app = require("./app");
// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const http = require('http')
const server = http.createServer(app)
require('./config/socket')(server)



const PORT = process.env.PORT || 5005;
const HOST = process.env.HOST || "0.0.0.0";
server.listen(`${HOST}:${PORT}`, function () {
    console.log(`Server listening on http://${HOST}:${PORT}`);
});
