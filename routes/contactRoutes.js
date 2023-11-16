const express = require('express');
const router = express.Router();
const { postMessage } = require('../controllers/contactController');

router.use(express.urlencoded({ extended: true }));

router.post('/', postMessage);

module.exports = router;
