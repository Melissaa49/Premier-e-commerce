
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');


// Créer un nouvel utilisateur
router.post('/users', UserController.createUser);

// Obtenir la liste des utilisateurs
router.get('/users', UserController.getUsers);

// Obtenir un utilisateur par ID
router.get('/users/:userId', UserController.getUserById);

// Mettre à jour un utilisateur par ID
router.put('/users/:userId', UserController.updateUser);

// Supprimer un utilisateur par ID
router.delete('/users/:userId', UserController.deleteUser);

module.exports = router;
