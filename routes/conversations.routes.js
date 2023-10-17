const router = require("express").Router()

const {
    getAllConversationsForUser,
    getConversation,
    saveConversation,
    deleteConversation,
} = require('../controllers/conversation.controller');

const { verifyToken } = require("../middleware/verifyToken")

router.get('/getAllConversationsForUser/:user_id', verifyToken, getAllConversationsForUser);
router.get('/getConversation/:sender_id/:receiver_id', verifyToken, getConversation);
router.delete('/deleteConversation/:conversation_id', verifyToken, deleteConversation);
router.post('/saveConversation', saveConversation)


module.exports = router;
