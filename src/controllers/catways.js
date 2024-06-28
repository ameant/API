const Catway = require("../models/catway");

/**
 * Récupère tous les catways
 * @param {express.Response} res Objet de réponse Express utilisé pour envoyer la réponse au client
 * @returns {Liste}
 */
exports.getCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.status(200).send(catways);
  } catch (err) {
    res.status(500).send(err);
  }
};

/**
 * Récupère un catway par son identifiant
 * @param {express.Request} req Objet de requête Express contenant les paramètres de la requête
 * @param {express.Response} res Objet de réponse Express utilisé pour envoyer la réponse au client
 * @returns {Réponse}
 */
exports.getCatwayById = async (req, res) => {
  const id = req.params.id;

  try {
    let catway = await Catway.findById(id);

    if (catway) {
      return res.status(200).json(catway);
    }

    return res.status(404).json("Catway non trouvé");
  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * Crée un catway
 * @param {express.Request} req Objet de requête Express contenant les données du catway à créer
 * @param {express.Response} res Objet de réponse Express utilisé pour envoyer la réponse au client
 * @returns {Réponse}
 */
exports.addCatway = async (req, res) => {
  const temp = {
    catwayNumber: req.body.catwayNumber,
    type: req.body.type,
    catwayState: req.body.catwayState,
  };

  try {
    let catway = await Catway.create(temp);

    return res.status(201).json(catway);
  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * Met à jour un catway existant
 * @param {express.Request} req Objet de requête Express contenant les données mises à jour du catway
 * @param {express.Response} res Objet de réponse Express utilisé pour envoyer la réponse au client
 * @returns {Réponse} 
 */
exports.updateCatway = async (req, res) => {
  const id = req.params.id;
  const temp = {
    catwayNumber: req.body.catwayNumber,
    type: req.body.type,
    catwayState: req.body.catwayState,
  };

  try {
    let catway = await Catway.findById({ _id: id });

    if (catway) {
      Object.keys(temp).forEach((key) => {
        if (!!temp[key]) {
          catway[key] = temp[key];
        }
      });

      await catway.save();
      return res.status(201).json(catway);
    }

    return res.status(404).json("Catway non trouvé");
  } catch (error) {
    return res.status(501).json(error);
  }
};

/**
 * Supprime un catway existant
 * @param {express.Request} req Objet de requête Express contenant les paramètres de la requête HTTP
 * @param {express.Response} res Objet de réponse Express utilisé pour envoyer la réponse au client
 * @returns {Réponse} 
 */
exports.deleteCatway = async (req, res) => {
  const id = req.params.id;

  try {
    await Catway.deleteOne({ _id: id });

    return res.status(204).json("Catway supprimé");
  } catch (error) {
    return res.status(501).json(error);
  }
};
