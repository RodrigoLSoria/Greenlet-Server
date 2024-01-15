const mongoose = require("mongoose")

const conversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    exchangeStatus: {
        type: String,
        enum: ['pending', 'closed', 'none'],
        default: 'none'
    },
    exchangeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlantExchange',
        default: null
    }
})


const Conversation = mongoose.model('Conversation', conversationSchema)

module.exports = Conversation
