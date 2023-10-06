/**
 * ROUTES ET PARAMÉTRAGES DES SAUCES ***********************************************************************************
 */

/** IMPORTATIONS ***********************************************/

/** Importations générales */
const express = require("express"); // Importe le module Express pour créer des routes.
const router = express.Router(); // Crée un routeur Express pour gérer les routes liées aux sauces.

/** Importation des fichiers JavaScript requis pour les routes */
const sauceCtrl = require('../controllers/sauce'); // Importe le contrôleur de sauces pour gérer les actions liées aux sauces.
const auth = require('../middleware/authorize'); // Importe le middleware d'autorisation pour sécuriser les routes.
const multer = require('../middleware/multer-config'); // Importe le middleware Multer pour gérer les fichiers téléchargés.

/** Importation des routes requises sous forme de fichiers JavaScript */
/**
 * Routes de type GET */
router.get("/", auth, sauceCtrl.getAllSauces); // Route pour obtenir toutes les sauces, sécurisée par le middleware d'autorisation.
router.get('/:id', auth, sauceCtrl.getOneSauce); // Route pour obtenir une seule sauce par son identifiant, sécurisée par le middleware d'autorisation.

/**
 * Routes de type POST */
router.post('/', auth, multer, sauceCtrl.createSauce); // Route pour créer une nouvelle sauce, sécurisée par le middleware d'autorisation et le middleware Multer pour gérer les fichiers.
router.post('/:id/like', auth, sauceCtrl.likeDislikeSauce); // Route pour aimer ou ne pas aimer une sauce, sécurisée par le middleware d'autorisation.

/**
 * Routes de type PUT */
router.put('/:id', auth, multer, sauceCtrl.updateSauce); // Route pour mettre à jour une sauce existante, sécurisée par le middleware d'autorisation et le middleware Multer.

/** Routes de type DELETE */
router.delete('/:id', auth, sauceCtrl.deleteSauce); // Route pour supprimer une sauce, sécurisée par le middleware d'autorisation.

/** EXPORTATION ***********************************************/
module.exports = router; // Exporte le routeur contenant toutes les routes liées aux sauces.
