const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  searchQuery: {
    type: String,
    trim: true,
    default: '',
  },
  selectedCategories: [{
    type: String,
  }],
  selectedPlantTypes: [{
    type: String,
  }],
  dateFilter: {
    type: String,
    default: 'all',
  },
  // You can add any other fields as per your requirements
}, {
  timestamps: true,
});

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert