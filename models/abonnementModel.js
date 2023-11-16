const mongoose = require('mongoose');

const abonnementSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prix: {
    type: Number,
    required: true
  },
  duree: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Abonnement', abonnementSchema);
