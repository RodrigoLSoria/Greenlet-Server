const Conversation = require("../models/Conversation.model")
const Message = require("../models/Message.model")
const { verifyToken } = require('../middleware/verifyToken')



const getAllConversationsForUser = (req, res, next) => {
    const { _id: user_id } = req.payload

    Conversation
        .find({ participants: user_id })
        .populate({
            path: 'post',
            select: 'image owner isClosed title'
        })
        .sort({ updatedAt: -1 })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const getOrCreateConversation = async (req, res, next) => {
    const { user1_id, user2_id, post_id } = req.params

    try {
        let conversation = await Conversation.findOneAndUpdate(
            {
                participants: { $all: [user1_id, user2_id].sort() },
                post: post_id
            },
            {
                $setOnInsert: { participants: [user1_id, user2_id].sort(), post: post_id }
            },
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true
            }
        )


        const messages = await Message.find({
            conversation: conversation._id
        }).sort({ timestamp: 1 })

        res.json({ conversation, messages })
    } catch (err) {
        next(err)
    }
}

const deleteConversation = (req, res, next) => {
    const { conversation_id } = req.params

    Conversation
        .findByIdAndDelete(conversation_id)
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

const getMessagesForConversation = async (req, res, next) => {
    const { conversation_id } = req.params

    try {
        const messages = await Message.find({ conversation: conversation_id })
            .populate({
                path: 'sender',
                select: 'username avatar _id'
            })
            .populate('conversation')
            .sort({ timestamp: -1 })
        res.json(messages)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllConversationsForUser,
    getOrCreateConversation,
    deleteConversation,
    getMessagesForConversation
}
