// profileController.js

const userModel = require('../models/userModel');
const orderModel = require('../models/orderModel');

async function renderProfilePage(req, res) {
  const userId = req.session.userId;
  if (!userId) {
    return res.redirect('/login');
  }

  try {
    // Trouver l'utilisateur par son ID
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).render('error', { message: 'Utilisateur non trouvé' });
    }
    // Trouver les commandes associées à l'utilisateur
    const orders = await orderModel.find({ user: userId });
    res.render('profile', { user, orders });
  } catch (error) {
    res.status(500).render('error', { message: 'Erreur lors du chargement du profil' });
  }
}
async function logoutUser(req, res) {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).send('Erreur lors de la déconnexion');
      } else {
        res.redirect('/');
      }
    });
  } else {
    res.redirect('/');
  }
}
module.exports = {
  renderProfilePage,
   logoutUser,
};
