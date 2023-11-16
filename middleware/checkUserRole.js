const userModel = require('../models/userModel');

module.exports = {
  // Middleware pour vérifier si un utilisateur est connecté
  isLoggedIn: async function (req, res, next) {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.redirect('/login'); // Redirigez vers la page de connexion si l'utilisateur n'est pas connecté
      }

      // Si l'utilisateur est connecté, passez à la route suivante
      next();
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur lors de la vérification de la connexion de l'utilisateur");
    }
  },

  // Middleware pour vérifier si l'utilisateur est un administrateur
  isAdmin: async function (req, res, next) {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.redirect('/login'); // Redirigez vers la page de connexion si l'utilisateur n'est pas connecté
      }

      const user = await userModel.findById(userId);
      if (!user) {
        return res.redirect('/login'); // Redirigez vers la page de connexion si l'utilisateur n'existe pas
      }

      if (!user.isAdmin) {
        return res.redirect('/'); // Redirigez vers la page d'accueil si l'utilisateur n'est pas un administrateur
      }

      // Passez à la route suivante si l'utilisateur est un administrateur
      next();
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur lors de la vérification du rôle de l'utilisateur");
    }
  },
};
