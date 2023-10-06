/**
 * ROUTES ET PARAMÉTRAGES DES UTILISATEURS ***********************************************************************************
 */

/** IMPORTATIONS ***********************************************/

/** Importations générales */
const express = require('express'); // Importe le module Express pour créer des routes.
const router = express.Router(); // Crée un routeur Express pour gérer les routes liées aux utilisateurs.

/** Importation des fichiers JavaScript requis pour les routes */
const userCtrl = require('../controllers/user');

/** CONFIGURATION DES ROUTES ***********************************/

/** Routes de type POST */
router.post('/signup', userCtrl.signup);
/**Une route '/signup' est configurée pour l'inscription des utilisateurs. Cette route est utilisée pour créer un nouveau compte utilisateur. */
router.post('/login', userCtrl.login);
/**Une route '/login' est configurée pour la connexion des utilisateurs. Cette route est utilisée pour authentifier les utilisateurs. */

/** EXPORTATION ***********************************************/
module.exports = router;