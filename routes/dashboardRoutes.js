const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const Product = require('../models/productModel'); 
const multer = require('multer');



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Routes pour la liste des clients, produits et commandes
router.get('/liste-clients', dashboardController.getClients);
router.get('/liste-de-produits', dashboardController.getProducts);
router.get('/liste-de-commandes', dashboardController.getOrders);
router.get('/product-user', dashboardController.getProductUser);
router.get('/ajouter-produit', dashboardController.getAddProduct);
router.post('/ajouter-produit', upload.single('productImage'), dashboardController.postAddProduct);
router.get('/modifier-produit/:productId', dashboardController.getEditProduct);
router.post('/modifier-produit/:productId', dashboardController.postUpdateProduct);
router.post('/supprimer-produit/:productId', dashboardController.postDeleteProduct);


// Routes pour les abonnements
router.get('/liste-abonnements', dashboardController.getSubscriptions);
router.get('/ajouter-abonnement', dashboardController.getAddSubscription);
router.post('/ajouter-abonnement', dashboardController.postAddSubscription); // Enlevez `upload.single('image')`
router.get('/modifier-abonnement/:subscriptionId', dashboardController.getEditSubscription);
router.post('/modifier-abonnement/:subscriptionId', dashboardController.postUpdateSubscription);
router.post('/supprimer-abonnement/:subscriptionId', dashboardController.postDeleteSubscription);


router.get('/deconnexion', dashboardController.logout);


module.exports = router;