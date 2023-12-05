const mongoose = require("mongoose")

const badgeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,

    },
    criteria: {
        type: Object,
        required: true,
    }
})

const Badge = mongoose.model('Badge', badgeSchema)

module.exports = Badge
