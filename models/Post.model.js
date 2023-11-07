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
            default: true  // default is that it requires potting
        },
        fertilizingFrequency: {
            type: Number,  // in weeks
            default: 4     // default is once a month
        },
        pruning: {
            type: Boolean,
            default: false // default is that it doesn't require pruning
        },
        repotting: {
            type: Boolean,
            default: false // default is that it doesn't require repotting
        },
        pestManagement: {
            type: String,
            maxLength: 250
        },
        dormancy: {
            type: Boolean,
            default: false // default is that it doesn't have a dormancy period
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
    });

postSchema.index({ "location": "2dsphere" })

const Post = mongoose.model('Post', postSchema, 'posts')

module.exports = Post;
