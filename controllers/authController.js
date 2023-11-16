const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

// Afficher le formulaire d'inscription
router.get('/signup', (req, res) => {
  res.render('signup'); 
});

// Gérer la soumission du formulaire d'inscription
router.post('/signup', async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    // Vérifier si les mots de passe correspondent
    if (password !== confirmPassword) {
      return res.status(400).send('Les mots de passe ne correspondent pas.');
    }

    // Créer un nouvel utilisateur
    const newUser = new userModel({
      email: email,
      password: password,
    });

    // Enregistrer l'utilisateur dans la base de données
    await newUser.save();

    res.redirect('/login'); 
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de l'inscription");
  }
});

// Middleware pour vérifier si l'utilisateur est un administrateur
router.use('/dashboard', async function (req, res, next) {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.redirect('/login'); 
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.redirect('/login'); 
    }

    if (!user.isAdmin) {
      return res.redirect('/');
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la vérification du rôle de l'utilisateur");
  }
});

module.exports = router;
