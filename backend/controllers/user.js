/**
 * PARAMÈTRES DE CONTRÔLE UTILISATEUR *****************************************************
 */

/** IMPORTATIONS ***********************************************/

/** Importations générales */
const bcrypt = require('bcrypt'); // Importer la bibliothèque 'bcrypt' pour le hachage des mots de passe
const jwt = require('jsonwebtoken'); // Importer la bibliothèque 'jsonwebtoken' pour la gestion des jetons d'authentification
require('dotenv').config(); // Charger les variables d'environnement à partir du fichier .env

/** Importations de fichiers JavaScript */
const User = require('../models/User'); // Importer le modèle User depuis le fichier ../models/User.js

/** EXPORTATIONS ***********************************************/

/** Contrôleur d'inscription (signup)
 * Hacher le mot de passe et l'envoyer avec l'email à la base de données
 */
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10) // Hacher le mot de passe avec un coût de hachage de 10 (sécurité)
    .then(hash => {
      const user = new User({
        email: req.body.email, // Récupérer l'email depuis la requête
        password: hash // Stocker le mot de passe haché dans la base de données
      });
      user.save() // Sauvegarder l'utilisateur dans la base de données
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' })) // Répondre avec un statut 201 (créé) et un message
        .catch(error => res.status(400).json({ error })); // En cas d'erreur, répondre avec un statut 400 (mauvaise requête) et l'erreur
    })
    .catch(error => res.status(500).json({ error })); // En cas d'erreur, répondre avec un statut 500 (erreur interne du serveur) et l'erreur
};

/** Contrôleur de connexion (login)
 * Comparer le mot de passe haché et l'email dans le formulaire avec la base de données
 */
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }) // Rechercher un utilisateur avec l'email fourni dans la base de données
    .then(user => {
      if (!user) { // Si l'utilisateur n'est pas trouvé, répondre avec un statut 401 (non autorisé) et un message d'erreur
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password) // Comparer le mot de passe fourni avec le mot de passe haché stocké dans la base de données
        .then(valid => {
          if (!valid) { // Si la comparaison échoue, répondre avec un statut 401 (non autorisé) et un message d'erreur
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({ // Si la comparaison réussit, répondre avec un statut 200 (OK) et un objet JSON contenant l'ID de l'utilisateur et un jeton d'authentification
            userId: user._id,
            token: jwt.sign(
              { userId: user._id }, // Contenu du jeton (ID de l'utilisateur)
              process.env.RANDOM_SECRET_TOKEN, // Clé secrète pour la signature du jeton, provenant des variables d'environnement
              { expiresIn: '24h' } // Durée de validité du jeton (24 heures)
            )
          });
        })
        // En cas d'erreur, répondre avec un statut 500 (erreur interne du serveur) et l'erreur
        .catch(error => res.status(500).json({ error }));
    })
    // En cas d'erreur, répondre avec un statut 500 (erreur interne du serveur) et l'erreur
    .catch(error => res.status(500).json({ error }));
};
