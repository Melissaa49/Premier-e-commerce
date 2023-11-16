const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true }, 
  createdAt: { type: Date, default: Date.now }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
