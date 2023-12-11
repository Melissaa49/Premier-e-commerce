// controllers/commandsController.js
const commandModel = require('../models/commandModel');
const Product = require('../models/productModel'); 

// Récupérer toutes les commandes
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await commandModel.find();
    res.render('orders', { orders });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de la récupération des commandes.');
  }
};

// Afficher les détails d'une commande spécifique
exports.getOrderDetails = async (req, res) => {
  try {
    const order = await commandModel.findById(req.params.id);
    res.render('orderDetails', { order });
  } catch (err) {
    res.status(500).send('Erreur lors de la récupération des détails de la commande.');
  }
};

// Afficher le formulaire de modification d'une commande
exports.getEditOrderForm = async (req, res) => {
  try {
    const order = await commandModel.findById(req.params.id);
    res.render('editOrder', { order });
  } catch (err) {
    res.status(500).send('Erreur lors de la récupération de la commande à modifier.');
  }
};

// Mettre à jour une commande
exports.editOrder = async (req, res) => {
  try {
    await commandModel.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/orders');
  } catch (err) {
    res.status(500).send('Erreur lors de la mise à jour de la commande.');
  }
};

// Supprimer une commande
exports.deleteOrder = async (req, res) => {
  try {
    await commandModel.findByIdAndRemove(req.params.id);
    res.redirect('/orders');
  } catch (err) {
    res.status(500).send('Erreur lors de la suppression de la commande.');
  }
};
