const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String, required: true },
  prix: { type: Number, required: true },
  duree: { type: Number, required: true },
  imageUrl: { type: String, required: false }, // Ajouter ce champ pour l'URL de l'image
  createdAt: { type: Date, default: Date.now }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
