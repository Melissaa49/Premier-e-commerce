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

// Ajouter un produit au panier
exports.addToCart = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { productId, quantity } = req.body;

    // Récupérer les détails du produit
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Produit non trouvé");
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Créer un nouveau panier s'il n'existe pas
      cart = await Cart.create({ 
        userId, 
        items: [{ productId, name: product.name, price: product.price, quantity }] 
      });
    } else {
      // Vérifier si le produit existe déjà dans le panier
      const itemIndex = cart.items.findIndex(p => p.productId == productId);

      if (itemIndex > -1) {
        // Mettre à jour la quantité si le produit existe
        const productItem = cart.items[itemIndex];
        productItem.quantity += quantity;
        cart.items[itemIndex] = productItem;
      } else {
        // Ajouter un nouveau produit au panier
        cart.items.push({ productId, name: product.name, price: product.price, quantity });
      }
    }

    await cart.save();
    res.status(200).send("Produit ajouté au panier");
  } catch (error) {
    res.status(500).send("Erreur lors de l'ajout au panier");
  }
};
