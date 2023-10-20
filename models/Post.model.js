const mongoose = require("mongoose")
const Constants = require("../consts/consts")


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: [true, 'title field cannot be empty'],
        trim: true,
        maxLength: 80
    },
    plantType: {
        type: String,
        enum: Constants.PLANT_TYPES,
        trim: true,
    },
    description: {
        type: String,
        // required: [true, 'Description field cannot be empty'],
        trim: true,
        maxLength: 500
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,

        },
    },
    category: {
        type: String,
        // required: [true, 'Category field cannot be empty'],
        enum: ['exchange', 'gift', 'found']
    },
    image: {
        type: String,
        default: null
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    isClosed: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    });

postSchema.index({ "location": "2dsphere" })

const Post = mongoose.model('Post', postSchema, 'posts')

module.exports = Post;
