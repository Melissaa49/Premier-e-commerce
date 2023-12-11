const Cart = require('../models/cartModel');

// Middleware pour gérer le panier des utilisateurs connectés et non connectés
exports.cartMiddleware = async (req, res, next) => {
  if (req.session.userId) {
    try {
      let cart = await Cart.findOne({ user: req.session.userId }).populate('items.product');
      if (!cart) {
        cart = new Cart({ user: req.session.userId, items: [] });
        await cart.save();
      }
      req.session.cart = cart;
    } catch (error) {
      console.error("Erreur lors de la récupération du panier:", error);
      req.session.cart = { items: [] };
    }
  } else {
    if (!req.session.cart) {
      req.session.cart = { items: [] };
    }
  }

  // Assigner le panier à res.locals pour l'accès dans les templates EJS
  res.locals.cart = req.session.cart;

  next();
};

// Ajouter ou mettre à jour un article dans le panier
exports.addToCart = async (req, res) => {
    console.log("Requête addToCart reçue:", req.body); // Pour le débogage

  const userId = req.session.userId || null; // null pour les utilisateurs non connectés
  const { productId, quantity } = req.body;

  // Vérifier la validité de la quantité
  if (!Number.isInteger(quantity) || quantity < 1) {
    return res.status(400).json({ message: "Quantité invalide" });
  }

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [{ product: productId, quantity }] });
    } else {
      let item = cart.items.find(item => item.product.toString() === productId);
      if (item) {
        item.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout au panier" });
  }
};

// Obtenir le panier
exports.getCart = async (req, res) => {
  const userId = req.session.userId || null;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    res.render('cart', { cart: cart || { items: [] } }); // Assurez-vous que 'cart' est le nom correct de votre fichier EJS
  } catch (error) {
    res.status(500).render('errorPage', { message: "Erreur lors de la récupération du panier" }); // Rendre une page d'erreur
  }
};

// Mettre à jour un article dans le panier
exports.updateCartItem = async (req, res) => {
  const userId = req.session.userId || null;
  const { productId, quantity } = req.body;

  // Vérifier la validité de la quantité
  if (!Number.isInteger(quantity) || quantity < 1) {
    return res.status(400).json({ message: "Quantité invalide" });
  }

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Panier non trouvé" });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Article non trouvé dans le panier" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du panier" });
  }
};

// Supprimer un article du panier
exports.deleteCartItem = async (req, res) => {
  const userId = req.session.userId || null;
  const productId = req.params.productId;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Panier non trouvé" });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'article du panier" });
  }
};

// Vider le panier
exports.emptyCart = async (req, res) => {
  const userId = req.session.userId || null;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Panier non trouvé" });
    }

    cart.items = [];
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors du vidage du panier" });
  }
};
