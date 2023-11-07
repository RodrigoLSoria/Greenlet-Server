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
    const { sender_id: sender, receiver_id: receiver, post_id: post } = req.params;

    Conversation
        .findOne({
            $or: [
                { sender, receiver, post },
                { sender: receiver, receiver: sender, post },
            ],
        })
        .populate('post')
        .then((existingConversation) => {
            console.log("hay existing conversation?", existingConversation);

            // If no existing conversation found, create a new one
            !existingConversation && Conversation.create({ sender, receiver, post, messages: [] })
                .then(newConversation => {
                    console.log("New conversation created");
                    res.json(newConversation);
                })
                .catch(err => {
                    console.error("Error al crear la conversación:", err);
                    next(err);
                });

            // If existing conversation found, return it
            existingConversation && res.json(existingConversation);
        })
        .catch((err) => next(err));


}

const deleteConversation = (req, res, next) => {
    const { conversation_id } = req.params;

    Conversation
        .findByIdAndDelete(conversation_id)
        .then(() => res.sendStatus(200))
        .catch(err => next(err));
}
//separar el save y el update en dos funciones diferentes

const createConversation = (req, res, next) => {

    const { sender, receiver, post, messages } = req.body;

    Conversation
        .create({ sender, receiver, post, messages })
        .then((newConversation) => {
            console.log("eeeeey soy el controller de  la createConversation y funciono, esto es lo que he creado ", newConversation)

            res.json(newConversation);
        })
        .catch((err) => next(err));
}

const updateConversation = (req, res, next) => {
    const { conversationId, messageId } = req.body;

    Conversation
        .findById(conversationId)
        .then(existingConversation => {
            if (!existingConversation) {
                throw new Error('Conversation not found');
            }
            existingConversation.messages.push(messageId);
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
    createConversation,
    updateConversation
};
