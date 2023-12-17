const router = require("express").Router()

const {
    sendMessage,
    deleteMessage,
} = require('../controllers/message.controller')

const { verifyToken } = require("../middleware/verifyToken")

router.post('/sendMessage', verifyToken, sendMessage)
router.delete('/deleteMessage/:messageId', verifyToken, deleteMessage)

module.exports = router
