/**
 * MODÈLE ET PARAMÉTRAGES DE SAUCE ***********************************************************************************
 */

/** IMPORTATIONS ***********************************************/

/** Importation générale */
const mongoose = require('mongoose'); // Importe le module Mongoose, un ODM (Object Data Modeling) pour travailler avec MongoDB.

/** Création du schéma */
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true }, // Identifiant de l'utilisateur qui a créé la sauce (obligatoire).
  name: { type: String, required: true }, // Nom de la sauce (obligatoire).
  manufacturer: { type: String, required: true }, // Fabricant de la sauce (obligatoire).
  description: { type: String, required: true }, // Description de la sauce (obligatoire).
  mainPepper: { type: String, required: true }, // Principal ingrédient épicé de la sauce (obligatoire).
  imageUrl: { type: String, required: true }, // URL de l'image de la sauce (obligatoire).
  heat: { type: Number, required: true }, // Niveau de piquant de la sauce, sous forme de nombre (obligatoire).
  likes: { type: Number, required: true }, // Nombre de likes reçus par la sauce (obligatoire).
  dislikes: { type: Number, required: true }, // Nombre de dislikes reçus par la sauce (obligatoire).
  usersLiked: { type: [String], required: true }, // Tableau d'identifiants d'utilisateurs ayant aimé la sauce (obligatoire).
  usersDisliked: { type: [String], required: true }, // Tableau d'identifiants d'utilisateurs ayant désaimé la sauce (obligatoire).
})

/** EXPORTATION ***********************************************/
module.exports = mongoose.model('Sauce', sauceSchema); // Exporte le modèle 'Sauce' basé sur le schéma 'sauceSchema' pour être utilisé dans d'autres parties de l'application.
