/**
 * PARAMÉTRAGES DU MIDDLEWARE MULTER
 */

// IMPORTATIONS

/** Importation générale */
const multer = require('multer'); // Importe le module Multer pour gérer le téléchargement de fichiers, notamment les images.

// Unification des types de fichiers
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Importation de fichiers images depuis l'utilisateur vers la base de données
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images'); // Définit le répertoire de destination pour les images téléchargées comme 'images'.
  },
  filename: (req, file, callback) => {
    // Remplace les espaces dans le nom de fichier par des underscores.
    const name = file.originalname.split(' ').join('_');
    // Récupère l'extension de fichier à partir du type MIME de l'image.
    const extension = MIME_TYPES[file.mimetype];
    // Définit le nom de fichier avec un horodatage unique.
    callback(null, name + Date.now() + '.' + extension);
  }
});

// EXPORTATION
module.exports = multer({
  storage: storage, // Configuration du stockage des fichiers.
  limits: { fileSize: 1000000 } // Limitation de la taille des fichiers à 1 Mo.
}).single('image'); // Middleware Multer configuré pour traiter un seul fichier image à la fois.
