const Conversation = require("../models/Conversation.model");
const { verifyToken } = require('../middleware/verifyToken')



const getAllConversationsForUser = (req, res, next) => {
    const { _id: user_id } = req.payload

    Conversation
        .find({ $or: [{ sender: user_id }, { receiver: user_id }] })
        .populate(['sender', 'receiver', 'post'])
        .sort({ timestamp: -1 })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const getConversation = (req, res, next) => {
    const { sender_id, receiver_id } = req.params

    Conversation
        .findOne({
            $or: [
                { sender: sender_id, receiver: receiver_id },
                { sender: receiver_id, receiver: sender_id }
            ]
        })
        .populate(['sender', 'receiver', 'messages', 'post'])
        .sort({ timestamp: 1 })
        .then(response => res.json(response))
        .catch(err => next(err))
}

const deleteConversation = (req, res, next) => {
    const { conversation_id } = req.params;

    Conversation
        .findByIdAndDelete(conversation_id)
        .then(() => res.sendStatus(200))
        .catch(err => next(err));
}

const saveConversation = (req, res, next) => {
    const { sender, receiver, messages, post, message_id } = req.body;

    Conversation
        .findOne({
            $or: [
                { sender, receiver },
                { sender: receiver, receiver: sender },
            ],
        })
        .then((existingConversation) => {
            if (!existingConversation) {
                // If no existing conversation found, create a new one
                return Conversation.create({ sender, receiver, post, messages });
            }

            // Update the existing conversation with the new message
            existingConversation.messages.push(message_id);
            return existingConversation.save();
        })
        .then((updatedConversation) => {
            res.json(updatedConversation);
        })
        .catch((err) => next(err));

}

module.exports = {
    getAllConversationsForUser,
    getConversation,
    deleteConversation,
    saveConversation,
};
