// models/priestProfile.js
const mongoose = require('mongoose');

const priestProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  religiousTradition: {
    type: String,
    required: true,
  },
  templesAffiliated: [{
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    }
  }],
  ceremonies: [{
    type: String,
    required: true,
  }],
  description: {
    type: String,
  },
  governmentIdVerified: {
    type: Boolean,
    default: false,
  },
  religiousCertificationVerified: {
    type: Boolean,
    default: false,
  },
  profilePicture: {
    type: String,
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  availability: {
    type: Map,
    of: [{
      startTime: String,
      endTime: String,
    }],
  },
  priceList: {
    type: Map,
    of: Number,
  },
  ceremonyCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('PriestProfile', priestProfileSchema);
