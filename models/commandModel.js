const mongoose = require('mongoose');

const commandSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  products: [
    {
      productName: String,
      quantity: Number,
      price: Number,
    },
  ],
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['En attente', 'En cours', 'Livré'],
    default: 'En attente',
  },
});

const Command = mongoose.model('Command', commandSchema);

module.exports = Command;
