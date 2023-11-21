const express = require('express');
const router = express.Router();
const { postMessage } = require('../controllers/contactController');

router.use(express.urlencoded({ extended: true }));
router.get('/', (req, res) => {
  res.render('contact'); // Assurez-vous que vous avez un fichier EJS nommé 'contact'
});

router.post('/', (req, res) => {
  console.log("Route /contact POST appelée");
  postMessage(req, res);
});


module.exports = router;
