const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  college: {
    type: String,
    trim: true,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PurchaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bundleId: {
    type: String,
    required: true
  },
  tierId: {
    type: String,
    required: true
  },
  purchasedAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent compile models model name conflicts
const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Purchase = mongoose.models.Purchase || mongoose.model('Purchase', PurchaseSchema);

module.exports = { User, Purchase };
