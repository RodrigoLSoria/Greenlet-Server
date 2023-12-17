const router = require("express").Router()

const {
    getAllConversationsForUser,
    getOrCreateConversation,
    deleteConversation,
    getMessagesForConversation
} = require('../controllers/conversation.controller')

const { verifyToken } = require("../middleware/verifyToken")

router.get('/getAllConversationsForUser/:user_id', verifyToken, getAllConversationsForUser)
router.get('/findOrCreate/:user1_id/:user2_id/:post_id', verifyToken, getOrCreateConversation)
router.delete('/deleteConversation/:conversation_id', verifyToken, deleteConversation)
router.get('/messages/:conversation_id', verifyToken, getMessagesForConversation)


module.exports = router
