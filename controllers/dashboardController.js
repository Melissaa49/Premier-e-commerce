const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const productModel = require('../models/productModel');
const orderModel = require('../models/commandModel');
const Subscription = require('../models/subscriptionModel');




// Fonction pour afficher la liste des clients
exports.getClients = async (req, res) => {
  try {
    const clients = await userModel.find();
    res.render('liste-clients', { clients, layout: false });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des clients');
  }
};

// Fonction pour afficher la liste des produits
exports.getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.render('liste-de-produits', { products, layout: false });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des produits');
  }
};

// Fonction pour afficher la liste des commandes
exports.getOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.render('liste-de-commandes', { orders, layout: false });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des commandes');
  }
};

// Fonction pour afficher le formulaire d'ajout de produit
exports.getAddProduct = (req, res) => {
  res.render('ajouter-produit', { layout: false });
};

// Fonction pour ajouter un nouveau produit
exports.postAddProduct = async (req, res) => {
  try {
    console.log("Produit à ajouter : ", req.body, req.file);

    const { name, description, price } = req.body;
    const imageUrl = '/uploads/' + req.file.filename;
    const newProduct = new productModel({
      name,
      description,
      price,
      imageUrl,
    });
    await newProduct.save();
    res.redirect('/dashboard/liste-de-produits');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de l\'ajout du produit');
  }
};

// Fonction pour afficher le formulaire de modification de produit
exports.getEditProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).send('Produit non trouvé');
    }
    res.render('modifier-produit', { product, layout: false }); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération du produit');
  }
};

// Fonction pour mettre à jour un produit
exports.postUpdateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { name, description, price } = req.body;
    await productModel.findByIdAndUpdate(productId, { name, description, price });
    res.redirect('/dashboard/liste-de-produits');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la mise à jour du produit');
  }
};

// Fonction pour supprimer un produit
exports.postDeleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    await productModel.findByIdAndRemove(productId);
    res.redirect('/dashboard/liste-de-produits');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la suppression du produit');
  }
};

exports.getProductUser = async (req, res) => {
  try {
    const userId = req.session.userId; 
    const products = await productModel.find();
    res.render('product-user', { userId, products }); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des produits');
  }
};

// Fonction pour afficher la liste des abonnements
exports.getSubscriptions = async (req, res) => {
  try {
    const abonnements = await Subscription.find(); 
    res.render('liste-abonnements', { abonnements }); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des abonnements');
  }
};
// Fonction pour afficher le formulaire d'ajout d'abonnement
exports.getAddSubscription = (req, res) => {
  res.render('ajouter-abonnement', { layout: false });
};

// Fonction pour ajouter un nouvel abonnement
exports.postAddSubscription = async (req, res) => {
  try {
    const { name, description, price, duration } = req.body;
    const newSubscription = new Subscription({ name, description, price, duration });
    await newSubscription.save();
    res.redirect('/dashboard/liste-abonnements');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de l\'ajout de l\'abonnement');
  }
};


// Fonction pour afficher le formulaire de modification d'abonnement
exports.getEditSubscription = async (req, res) => {
  try {
    const subscriptionId = req.params.subscriptionId;
    const abonnement = await Subscription.findById(subscriptionId);
    if (!abonnement) {
      return res.status(404).send('Abonnement non trouvé');
    }
    res.render('modifier-abonnement', { abonnement }); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération de l\'abonnement');
  }
};

// Fonction pour mettre à jour un abonnement
exports.postUpdateSubscription = async (req, res) => {
  try {
    const subscriptionId = req.params.subscriptionId;
    const { name, description, price, duration } = req.body;
    await Subscription.findByIdAndUpdate(subscriptionId, { name, description, price, duration });
    res.redirect('/dashboard/liste-abonnements');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la mise à jour de l\'abonnement');
  }
};

// Fonction pour supprimer un abonnement
exports.postDeleteSubscription = async (req, res) => {
  try {
    const subscriptionId = req.params.subscriptionId;
    await Subscription.findByIdAndRemove(subscriptionId);
    res.redirect('/dashboard/liste-abonnements');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la suppression de l\'abonnement');
  }
};
// Fonction pour gérer la déconnexion
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/');
    });
};