// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

const express = require("express");

const app = express();


require("./config")(app);




// 👇 Start handling routes here
const postsRoutes = require("./routes/posts.routes");
app.use("/api/feed", postsRoutes);

const uploadRoutes = require("./routes/upload.routes")
app.use("/api/upload", uploadRoutes)

const authRoutes = require("./routes/auth.routes")
app.use("/api/auth", authRoutes)

const messagesRoutes = require('./routes/messages.routes')
app.use('/api/messages', messagesRoutes)

const conversationsRoutes = require('./routes/conversations.routes')
app.use('/api/conversations', conversationsRoutes)

const userRoutes = require("./routes/user.routes")
app.use("/api/user", userRoutes)

require('./routes')(app)

require("./error-handling")(app);

module.exports = app;
