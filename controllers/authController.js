const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

// Afficher le formulaire d'inscription
router.get('/signup', (req, res) => {
  res.render('signup'); 
});

// Gérer la soumission du formulaire d'inscription
router.post('/signup', [
  body('email').isEmail().withMessage('Entrez une adresse e-mail valide.'),
  body('password').isLength({ min: 5 }).withMessage('Le mot de passe doit contenir au moins 5 caractères.'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Les mots de passe ne correspondent pas.');
    }
    return true;
  }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('signup', { errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      email: email,
      password: hashedPassword,
    });

    await newUser.save();
    res.redirect('/auth/login');
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de l'inscription");
  }
});

// Afficher le formulaire de connexion
router.get('/login', (req, res) => {
  res.render('login');
});

// Gérer la soumission du formulaire de connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(401).send('Adresse e-mail ou mot de passe incorrect');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send('Adresse e-mail ou mot de passe incorrect');
    }

    req.session.userId = user._id; // Stocker l'ID utilisateur dans la session

    // Redirection en fonction du rôle
    if (user.isAdmin) {
      res.redirect('/dashboard'); 
    } else {
      res.redirect('/'); 
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la connexion');
  }
});

module.exports = router;
