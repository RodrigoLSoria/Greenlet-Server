const router = require("express").Router()

const {
    getAllMessagesForUser,
    sendMessage,
    markAsRead,
    deleteMessage,
} = require('../controllers/message.controller');

const { verifyToken } = require("../middleware/verifyToken")

router.get('/getAllForUser/:user_id', verifyToken, getAllMessagesForUser);
router.post('/sendMessage', verifyToken, sendMessage);
router.patch('/markAsRead/:messageId', verifyToken, markAsRead);
router.delete('/deleteMessage/:messageId', verifyToken, deleteMessage);

module.exports = router;
