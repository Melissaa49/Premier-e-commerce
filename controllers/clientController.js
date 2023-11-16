const Client = require('../models/userModel'); 

const clientController = {
  // Affiche la liste de tous les clients
  getAllClients: async (req, res) => {
    try {
      const clients = await Client.find();  
      res.render('clients/list', { clients }); 
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la récupération des clients');
    }
  },

  // Affiche le formulaire de création de client
  getCreateClientForm: (req, res) => {
    res.render('clients/create'); 
  },

  // Crée un nouveau client en utilisant les données soumises dans le formulaire
  createClient: async (req, res) => {
    try {
      const { firstName, lastName, email } = req.body;
      const newClient = new Client({
        firstName,
        lastName,
        email,
      });
      await newClient.save();  
      res.redirect('/clients');  
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la création du client');
    }
  },

  // Affiche les détails d'un client spécifique en utilisant son ID
  getClientDetails: async (req, res) => {
    try {
      const clientId = req.params.id;
      const client = await Client.findById(clientId);  
      if (!client) {
        return res.status(404).send('Client non trouvé');
      }
      res.render('clients/details', { client });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la récupération des détails du client');
    }
  },

  // Affiche le formulaire de modification pour un client spécifique en utilisant son ID
  getEditClientForm: async (req, res) => {
    try {
      const clientId = req.params.id;
      const client = await Client.findById(clientId);  
      if (!client) {
        return res.status(404).send('Client non trouvé');
      }
      res.render('clients/edit', { client }); 
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la récupération du formulaire de modification du client');
    }
  },

  // Met à jour un client en utilisant les données soumises dans le formulaire
  editClient: async (req, res) => {
    try {
      const clientId = req.params.id;
      const { firstName, lastName, email } = req.body;
      const updatedClient = await Client.findByIdAndUpdate(clientId, {
        firstName,
        lastName,
        email,
      });
      if (!updatedClient) {
        return res.status(404).send('Client non trouvé');
      }
      res.redirect('/clients'); 
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la mise à jour du client');
    }
  },

  // Supprime un client spécifique en utilisant son ID
  deleteClient: async (req, res) => {
    try {
      const clientId = req.params.id;
      const deletedClient = await Client.findByIdAndRemove(clientId);
      if (!deletedClient) {
        return res.status(404).send('Client non trouvé');
      }
      res.redirect('/clients');  
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la suppression du client');
    }
  }
};

module.exports = clientController;
