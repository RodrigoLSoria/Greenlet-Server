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
    }
})

conversationSchema.index({ participants: 1, post: 1 }, { unique: true })

const Conversation = mongoose.model('Conversation', conversationSchema)

module.exports = Conversation
