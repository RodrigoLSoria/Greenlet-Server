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

const exchangesRoutes = require('./routes/exchange.routes')
app.use('/api/exchanges', exchangesRoutes)

const badgesRoutes = require('./routes/badge.routes')
app.use('/api/badges', badgesRoutes)

const userRoutes = require("./routes/user.routes")
app.use("/api/user", userRoutes)

const mapsRoutes = require("./routes/maps.routes");
app.use("/api/maps", mapsRoutes)

const alertsRoutes = require("./routes/alerts.routes");
app.use("/api/alerts", alertsRoutes);

require('./routes')(app)

require("./error-handling")(app);

module.exports = app;
