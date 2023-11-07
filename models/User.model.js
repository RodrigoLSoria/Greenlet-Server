const mongoose = require('mongoose');

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
      default: null,
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
        min: 1,  // Assuming a rating from 1 to 5
        max: 5,
      },
      comment: {  // Users can leave comments with their ratings
        type: String,
        trim: true,
      },
      exchangeId: {  // Tying each rating to a specific exchange
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exchange', // Assuming you have an Exchange model
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
);

const User = mongoose.model('User', userSchema);

module.exports = User;
