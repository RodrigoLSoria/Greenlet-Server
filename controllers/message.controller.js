const Conversation = require("../models/Conversation.model")
const Message = require("../models/Message.model")
const { verifyToken } = require('../middleware/verifyToken')


const sendMessage = async (req, res, next) => {
    const { conversation, content } = req.body
    const { _id: sender } = req.payload

    console.log("sendMessage", conversation, content, sender)
    try {
        const message = await Message.create({
            conversation: conversation,
            sender,
            content,
        })

        await Conversation.findByIdAndUpdate(conversation, { updatedAt: Date.now() })
        res.status(201).json(message)
    } catch (err) {
        next(err)
    }
}

const deleteMessage = (req, res, next) => {
    const { message_Id } = req.params

    Message
        .findByIdAndDelete(message_Id)
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

module.exports = {
    sendMessage,
    deleteMessage,
}
