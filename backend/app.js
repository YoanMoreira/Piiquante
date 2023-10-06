/**
 * APP SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** Importation des modules nécessaires */
const express = require('express'); // Framework Express pour créer le serveur web
const mongoose = require('mongoose'); // Module Mongoose pour interagir avec MongoDB
const helmet = require('helmet'); // Middleware Helmet pour la sécurité HTTP
const path = require('path'); // Module Path pour gérer les chemins de fichiers
const app = express(); // Crée une instance d'Express
require('dotenv').config(); // Charge les variables d'environnement à partir d'un fichier .env

/** Importation des fichiers de routes */
const userRoutes = require('./routes/user'); // Importe les routes liées aux utilisateurs
const sauceRoutes = require('./routes/sauce'); // Importe les routes liées aux sauces

/**
 * Link to MongoDB ***********************************************************************************
 */
mongoose.connect(process.env.SECRET_DB, {
  useNewUrlParser: true, // Utilise le nouveau gestionnaire d'URL MongoDB
  useUnifiedTopology: true, // Utilise la topologie unifiée MongoDB
})
  .then(() => console.log('Connexion à MongoDB réussie !')) // Si la connexion réussit, affiche un message de succès
  .catch(() => console.log('Connexion à MongoDB échouée !')); // Si la connexion échoue, affiche un message d'erreur

/**
 * Prevent Cors issues ***********************************************************************************
 */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permet à toutes les origines d'accéder à l'API
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Autorise certains en-têtes HTTP
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Autorise certaines méthodes HTTP
  next(); // Passe au middleware suivant
});

/**
 * Some security configuration ***********************************************************************************
 */

/** Exclusion de crossOriginResourcePolicy de la configuration Helmet pour permettre l'utilisation d'images */
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

/** Reconnaissance de l'objet Req comme un objet JSON */
app.use(express.json());

/** Routes des images pour Multer */
app.use('/images', express.static(path.join(__dirname, 'images'))); // Définit un chemin statique pour les images

/** Utilisation des routes liées aux utilisateurs */
app.use('/api/auth', userRoutes);

/** Utilisation des routes liées aux sauces */
app.use('/api/sauces', sauceRoutes);

/** EXPORT ***********************************************/
module.exports = app; // Exporte l'instance d'Express en tant que module
