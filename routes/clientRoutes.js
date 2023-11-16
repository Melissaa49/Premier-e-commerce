const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Route pour afficher la liste de tous les clients
router.get('/', clientController.getAllClients);

// Route pour afficher le formulaire de création de client
router.get('/create', clientController.getCreateClientForm);

// Route pour traiter la création d'un nouveau client
router.post('/create', clientController.createClient);

// Route pour afficher les détails d'un client spécifique
router.get('/:id', clientController.getClientDetails);

// Route pour afficher le formulaire de modification d'un client
router.get('/:id/edit', clientController.getEditClientForm);

// Route pour traiter la modification d'un client
router.put('/:id/edit', clientController.editClient);

// Route pour supprimer un client
router.delete('/:id', clientController.deleteClient);

module.exports = router;
