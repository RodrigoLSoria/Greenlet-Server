module.exports = app => {
    const postsRoutes = require('./posts.routes')
    app.use('/api/posts', postsRoutes)

    const authRoutes = require('./auth.routes')
    app.use('/api/auth', authRoutes)

    const messagesRoutes = require('./messages.routes')
    app.use('/api/messages', messagesRoutes)

    const uploadRoutes = require('./upload.routes')
    app.use('/api/upload', uploadRoutes)

    const conversationsRoutes = require('./conversations.routes')
    app.use('/api/conversations', conversationsRoutes)

    const userRoutes = require("./user.routes")
    app.use("/api/user", userRoutes)
}   