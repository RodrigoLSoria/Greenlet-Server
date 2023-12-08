const mongoose = require("mongoose")

const plantExchangeSchema = new mongoose.Schema({
    giver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    givenPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    receivedPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending',
    },
})

const PlantExchange = mongoose.model('PlantExchange', plantExchangeSchema, 'plantExchanges')

module.exports = PlantExchange
