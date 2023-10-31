const router = require("express").Router()

const {
    getAllConversationsForUser,
    getConversation,
    deleteConversation,
    createConversation,
    updateConversation,
} = require('../controllers/conversation.controller');

const { verifyToken } = require("../middleware/verifyToken")

router.get('/getAllConversationsForUser/:user_id', verifyToken, getAllConversationsForUser);
router.get('/getConversation/:sender_id/:receiver_id/:post_id', verifyToken, getConversation);
router.delete('/deleteConversation/:conversation_id', verifyToken, deleteConversation);
router.post('/createConversation', verifyToken, createConversation);  // Create new conversation
router.put('/updateConversation/:conversation_id', verifyToken, updateConversation);  // Update existing conversation


module.exports = router;
