const Conversation = require("../models/Conversation.model")
const Message = require("../models/Message.model")
const { verifyToken } = require('../middleware/verifyToken')


const getAllConversationsForUser = (req, res, next) => {
    const { _id: user_id } = req.payload

    Conversation
        .find({ participants: user_id })
        .populate('participants', 'username')
        .populate({
            path: 'post',
            select: 'image owner isClosed title'
        })
        .then(response => {
            const sortedConversations = response.sort((a, b) => {
                const statusOrder = { pending: 1, none: 2, closed: 3 }
                const statusComparison = statusOrder[a.exchangeStatus] - statusOrder[b.exchangeStatus]
                if (statusComparison !== 0) return statusComparison
                return new Date(b.updatedAt) - new Date(a.updatedAt)
            })

            res.json(sortedConversations)
        })
        .catch(err => next(err))
}


const getOrCreateConversation = async (req, res, next) => {
    const { user1_id, user2_id, post_id } = req.params

    try {
        let conversation = await Conversation.findOne({
            participants: { $all: [user1_id, user2_id].sort() },
            post: post_id
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [user1_id, user2_id].sort(),
                post: post_id
            })
        }

        const messages = await Message.find({ conversation: conversation._id }).sort({ timestamp: 1 })

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
