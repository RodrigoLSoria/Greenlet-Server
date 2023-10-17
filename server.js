var app = require("./app");
// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const http = require('http')



const server = http.createServer(app)
require('./config/socket')(server)



var PORT = process.env.PORT || 5005;
server.listen(PORT, function () {
    console.log("Server listening on http://localhost:".concat(PORT));
});
