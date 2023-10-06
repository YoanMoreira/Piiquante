/**
 * PARAMÉTRAGES DU MIDDLEWARE D'AUTORISATION
 */

// IMPORTATIONS

/** Importation générale */
const jwt = require('jsonwebtoken'); // Importe le module JSON Web Token (JWT) pour gérer les tokens d'authentification.
require('dotenv').config(); // Importe le module 'dotenv' pour charger des variables d'environnement depuis un fichier '.env'.

// EXPORTATION

/** Comparer le token actuel avec le token décodé */
module.exports = (req, res, next) => {
  try {
    // Récupère le token depuis les en-têtes de la requête.
    const token = req.headers.authorization.split(' ')[1];
    // Décode le token en utilisant la clé secrète spécifiée dans les variables d'environnement.
    const decodedToken = jwt.verify(token, process.env.RANDOM_SECRET_TOKEN);
    // Récupère l'identifiant de l'utilisateur à partir du token décodé.
    const userId = decodedToken.userId;
    // Ajoute l'identifiant de l'utilisateur à l'objet 'auth' dans la requête.
    req.auth = { userId };
    // Vérifie si l'identifiant de l'utilisateur dans le corps de la requête correspond à l'identifiant du token.
    if (req.body.userId && req.body.userId !== userId) {

      throw 'Invalid user ID'; // Lance une erreur si l'identifiant est invalide.
    } else {
      next(); // Passe à la prochaine étape du middleware si tout est correct.
    }
  } catch {
    res.status(401).json({
      error: new Error('403: unauthorized request.')
    });
  }
};
