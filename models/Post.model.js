const mongoose = require("mongoose")
const Constants = require("../consts/consts")


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title field cannot be empty'],
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
        required: [true, 'Description field cannot be empty'],
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
        required: [true, 'Category field cannot be empty'],
        enum: ['exchange', 'gift'],
        default: 'exchange'
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/depxadgb3/image/upload/v1704991817/lrz8ej7s3uqdsz9myuj9.png"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    isClosed: {
        type: Boolean,
        default: false
    },
    careInstructions: {
        location: {
            type: String,
            enum: ['interior', 'exterior', 'both'],
            default: 'interior'
        },
        light: {
            type: String,
            enum: ['low', 'medium', 'high', 'direct sunlight'],
            default: 'medium'
        },
        wateringFrequency: {
            type: Number,  // in days
            default: 7     // default is once a week
        },
        temperature: {
            indoor: {
                type: String,
                enum: ['cold', 'temperate', 'warm'],
                default: 'temperate'
            },
            outdoor: {
                type: String,
                enum: ['cold', 'temperate', 'warm', 'hardiness zones'],
                default: 'temperate'
            }
        },
        humidity: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'medium'
        },
        soilType: {
            type: String,
            enum: ['sandy', 'loamy', 'clayey', 'peaty', 'chalky', 'silty'],
            default: 'loamy'
        },
        potting: {
            type: Boolean,
            default: true
        },
        fertilizingFrequency: {
            type: Number,
            default: 4
        },
        pruning: {
            type: Boolean,
            default: false
        },
        repotting: {
            type: Boolean,
            default: false
        },
        pestManagement: {
            type: String,
            maxLength: 250
        },
        dormancy: {
            type: Boolean,
            default: false
        },
        propagation: {
            type: String,
            maxLength: 150
        },
        wateringMethod: {
            type: String,
            enum: ['top-watering', 'bottom-watering', 'misting', 'soak and dry'],
            default: 'top-watering'
        },
        toxicity: {
            type: String,
            enum: ['non-toxic', 'toxic'],
            default: 'non-toxic'
        },
        specialNeeds: {
            type: String,
            maxLength: 150
        },
        otherNotes: {
            type: String,
            maxLength: 250
        }
    },
    equipment: {
        equipmentType: {
            type: String,
            enum: Object.keys(Constants.EQUIPMENT_TYPES).flatMap(
                key => Constants.EQUIPMENT_TYPES[key]
            ),
            trim: true,
        },
        condition: {
            type: String,
            enum: ['new', 'like new', 'used', 'well-worn'],
        },
        otherNotes: {
            type: String,
            maxLength: 250,
        }
    }
},
    {
        timestamps: true
    })

postSchema.index({ "location": "2dsphere" })

const Post = mongoose.model('Post', postSchema, 'posts')

module.exports = Post
