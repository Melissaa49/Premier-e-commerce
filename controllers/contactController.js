// contactController.js
const Message = require('../models/messageModel'); 

const postMessage = async (req, res) => {
    const { name, email, message } = req.body;

  try {
    
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.send('Message reçu et enregistré.');
} catch (error) {
    res.status(500).send('Erreur lors de la sauvegarde du message.');
}
};
module.exports = {
    postMessage,
};