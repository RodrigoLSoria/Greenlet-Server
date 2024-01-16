const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    username: {
      type: String,
      required: [true, 'Username is required.'],
      unique: true,
      trim: true,
    },
    avatar: {
      type: String,
      default: 'https://res.cloudinary.com/depxadgb3/image/upload/v1705424919/DALL_E_2024-01-16_18.06.51_-_A_stylized_profile_picture_with_a_minimalist_human_silhouette_filled_with_an_assortment_of_green_leaves_suggesting_a_connection_to_nature._The_backgr_se8ggf.png',
    },
    bio: {
      type: String,
      default: null,
    },
    favorites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    }],
    badges: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Badge',
    }],
    wishlist: [{
      type: String,
      max: 10,
    }],
    alerts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Alert',
    }],
    ratings: [{
      rater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      value: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        trim: true,
      },
      exchangeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exchange',
        required: true,
      }
    }],
    exchanges: [{
      plantType: {
        type: String,
        required: true,
      },
      count: {
        type: Number,
        default: 1,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    }],

  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

module.exports = User
