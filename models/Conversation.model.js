const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ],
    lastReadMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;