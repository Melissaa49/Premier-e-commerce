const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Appliquer le cartMiddleware à toutes les routes de cartRoutes
router.use(cartController.cartMiddleware);
// Ajouter un produit au panier
router.post('/add', cartController.addToCart);

// Afficher le panier
router.get('/', cartController.getCart);

// Mettre à jour un produit dans le panier
router.put('/update/:productId', cartController.updateCartItem);

// Supprimer un produit du panier
router.delete('/delete/:productId', cartController.deleteCartItem);

// Vider le panier
router.delete('/empty', cartController.emptyCart);

module.exports = router;
