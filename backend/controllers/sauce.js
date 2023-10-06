/**
 * SAUCE CTRL SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** Importations générales */
const fs = require('fs'); // Importe le module 'fs' pour la gestion des fichiers.

/** Importations de fichiers JavaScript */
const Sauce = require('../models/Sauce'); // Importe le modèle 'Sauce' qui semble défini ailleurs dans le projet.

/** EXPORT ***********************************************/

/**
 * Obtenir les contrôleurs (controllers)
 */

/** Rechercher toutes les sauces dans la base de données */
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};

/** Rechercher une sauce par son ID dans la base de données */
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
}

/**
 * Contrôleurs de création (POST)
 */

/** Créer une sauce dans la base de données */
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce); // Parse les données JSON de la requête.
  delete sauceObject._id; // Supprime l'ID existant, s'il y en a un.
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [' '],
    usersdisLiked: [' '],
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée" }))
    .catch((error) => res.status(400).json({ error }));
};

/**
 * Contrôleur de mise à jour (PUT)
 */

/** Mettre à jour une sauce dans la base de données */
exports.updateSauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
    .catch(error => res.status(400).json({ error }));
};

/**
 * Contrôleur de suppression (DELETE)
 */

/** Supprimer une sauce et son image de la base de données */
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(res.status(200).json({ message: "Sauce supprimée" }))
          .catch(error => res.status(400).json({ error }))
      })
    })
    .catch(error => res.status(500).json({ error }));
};

/**
 * Contrôleur de "j'aime" (like)
 */

/** Aimer ou ne pas aimer une sauce dans la base de données */
exports.likeDislikeSauce = (req, res, next) => {
  /** Collecter ce dont nous avons besoin à partir de l'objet sauce dans la base de données */
  let like = req.body.like;
  let userId = req.body.userId;
  let sauceId = req.params.id;

  switch (like) {
    /** Partie "J'aime" */
    case 1:
      Sauce.updateOne({ _id: sauceId }, { $push: { usersLiked: userId }, $inc: { likes: +1 } })
        .then(() => res.status(200).json())
        .catch((error) => res.status(400).json({ error }));
      break;

    /** Mettre à jour le nombre de "j'aime" et de "je n'aime pas" */
    case 0:
      Sauce.findOne({ _id: sauceId })
        .then((sauce) => {
          if (sauce.usersLiked.includes(userId)) {
            Sauce.updateOne({ _id: sauceId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 } })
              .then(() => res.status(200).json())
              .catch((error) => res.status(400).json({ error }));
          }
          if (sauce.usersDisliked.includes(userId)) {
            Sauce.updateOne({ _id: sauceId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } })
              .then(() => res.status(200).json())
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(404).json({ error }));
      break;

    /** Partie "Je n'aime pas" */
    case -1:
      Sauce.updateOne({ _id: sauceId }, { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } })
        .then(() => { res.status(200).json() })
        .catch((error) => res.status(400).json({ error }));
      break;
  }
};
