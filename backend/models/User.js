/**
 * MODÈLE UTILISATEUR ET PARAMÉTRAGES
 */

// IMPORTATIONS
const mongoose = require('mongoose'); // Importe le module Mongoose, un ODM (Object Data Modeling) pour travailler avec MongoDB.
const uniqueValidator = require('mongoose-unique-validator'); // Importe le module 'mongoose-unique-validator' pour gérer la validation d'unicité des champs dans le modèle.

// CRÉATION DU SCHÉMA
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// UTILISATION POUR S'ASSURER QUE L'EMAIL EST UNIQUE
userSchema.plugin(uniqueValidator);

// EXPORTATION
module.exports = mongoose.model('User', userSchema);
