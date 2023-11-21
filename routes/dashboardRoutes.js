const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const checkUserRole = require('../middleware/checkUserRole');
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

//voir le dashboard 
router.get('/', checkUserRole.isAdmin, dashboardController.dashboardMain);

// Routes pour la liste des clients, produits et commandes
router.get('/liste-clients', dashboardController.getClients);
router.get('/liste-de-produits', dashboardController.getProducts);
router.get('/liste-de-commandes', dashboardController.getOrders);
router.get('/product-user', dashboardController.getProductUser);
router.get('/ajouter-produit', dashboardController.getAddProduct);
router.post('/ajouter-produit', upload.single('productImage'), dashboardController.postAddProduct);
router.get('/modifier-produit/:productId', dashboardController.getEditProduct);
router.put('/modifier-produit/:productId', upload.single('productImage'), dashboardController.putUpdateProduct);
router.delete('/supprimer-produit/:productId', dashboardController.deleteProduct);


// Routes pour les abonnements
router.get('/liste-abonnements', dashboardController.getSubscriptions);
router.get('/ajouter-abonnement', dashboardController.getAddSubscription);
router.post('/ajouter-abonnement', upload.single('abonnementImage'), dashboardController.postAddSubscription);
router.get('/modifier-abonnement/:subscriptionId', dashboardController.getEditSubscription);
router.put('/modifier-abonnement/:subscriptionId', upload.single('abonnementImage'), dashboardController.putUpdateSubscription);
router.delete('/supprimer-abonnement/:subscriptionId', dashboardController.deleteSubscription);


router.get('/deconnexion', dashboardController.logout);


module.exports = router;