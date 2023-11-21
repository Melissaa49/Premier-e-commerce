// contactController.js
const Message = require('../models/messageModel'); 

const postMessage = async (req, res) => {
    const { name, email, message } = req.body;
    console.log("Données reçues du formulaire:", req.body); // Ajouter pour le débogage

    try {
        const newMessage = new Message({ name, email, message });
        await newMessage.save();
        console.log("Message enregistré:", newMessage); // Pour confirmation
        res.send('Message reçu et enregistré.');
    } catch (error) {
        console.error("Erreur lors de l'enregistrement:", error);
        res.status(500).send('Erreur lors de la sauvegarde du message.');
    }
};


module.exports = {
    postMessage,
};