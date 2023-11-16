const express = require('express');
const router = express.Router();
const orderController = require('../controllers/commandsController');

// Route pour afficher la liste de toutes les commandes (Read - Lire)
router.get('/', orderController.getAllOrders);

// Route pour afficher le formulaire de création d'une commande (Create - Créer)
router.get('/new', orderController.getCreateOrderForm);

// Route pour créer une nouvelle commande (Create - Créer)
router.post('/', orderController.createOrder);

// Route pour afficher les détails d'une commande spécifique (Read - Lire)
router.get('/:id', orderController.getOrderDetails);

// Route pour afficher le formulaire de modification d'une commande (Update - Mettre à jour)
router.get('/:id/edit', orderController.getEditOrderForm);

// Route pour mettre à jour une commande (Update - Mettre à jour)
router.put('/:id', orderController.editOrder);

// Route pour supprimer une commande (Delete - Supprimer)
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
