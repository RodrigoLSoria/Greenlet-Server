const Message = require("../models/Message.model");
const { verifyToken } = require('../middleware/verifyToken')



const getAllMessagesForUser = (req, res, next) => {
    const { _id: user_id } = req.payload

    Message
        .find({ $or: [{ sender: user_id }, { receiver: user_id }] })
        .populate(['sender', 'receiver'])
        .sort({ timestamp: -1 })
        .then(messages => res.json(messages))
        .catch(err => next(err))
}

const sendMessage = (req, res, next) => {
    const { receiver, content } = req.body;

    const { _id: sender } = req.payload

    Message
        .create({ sender, receiver, content })
        .then(message => {
            res.json(message)
        })
        .catch(err => next(err));
}

const markAsRead = (req, res, next) => {
    const { message_Id } = req.params;

    Message
        .findByIdAndUpdate(message_Id, { read: true }, { new: true })
        .then(message => res.json(message))
        .catch(err => next(err));
}

const deleteMessage = (req, res, next) => {
    const { message_Id } = req.params;

    Message
        .findByIdAndDelete(message_Id)
        .then(() => res.sendStatus(200))
        .catch(err => next(err));
}

module.exports = {
    getAllMessagesForUser,
    sendMessage,
    markAsRead,
    deleteMessage,
};
