const router = require("express").Router()

const postsRoutes = require('./posts.routes')
router.use('/feed', postsRoutes)

const authRoutes = require('./auth.routes')
router.use('/auth', authRoutes)

const messagesRoutes = require('./messages.routes')
router.use('/messages', messagesRoutes)

const uploadRoutes = require('./upload.routes')
router.use('/upload', uploadRoutes)

const exchangesRoutes = require('./exchange.routes')
router.use('/exchanges', exchangesRoutes)

const badgesRoutes = require('./badge.routes')
router.use('/badges', badgesRoutes)

const conversationsRoutes = require('./conversations.routes')
router.use('/conversations', conversationsRoutes)

const userRoutes = require("./user.routes")
router.use("/user", userRoutes)

const mapsRoutes = require("./maps.routes")
router.use("/maps", mapsRoutes)

const alertsRoutes = require("./alerts.routes")
router.use("/alerts", alertsRoutes)

module.exports = router
