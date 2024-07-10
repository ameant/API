const User = require("../models/user");
const jwt = require("jsonwebtoken");

/**
 * Crée un utilisateur
 * @param {express.Request} req Objet de requête Express contenant les données de l'utilisateur à créer
 * @param {express.Response} res Objet de réponse Express utilisé pour envoyer la réponse au client
 * @returns {Réponse}
 */
exports.addUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.create({ name, email, password });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la création", error });
  }
};

/**
 * Met à jour un utilisateur existant
 * @param {express.Request} req Objet de requête Express contenant les données mises à jour de l'utilisateur
 * @param {express.Response} res Objet de réponse Express utilisé pour envoyer la réponse au client
 * @returns {Réponse} 
 */
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;

  try {
    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json("Utilisateur non trouvé");
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la modification", error });
  }
};

/**
 * Supprime un utilisateur existant
 * @param {express.Request} req Objet de requête Express contenant les paramètres de la requête HTTP
 * @param {express.Response} res Objet de réponse Express utilisé pour envoyer la réponse au client
 * @returns {Réponse} 
 */
exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json("Utilisateur non trouvé");
    }

    await User.findByIdAndDelete(id);
    return res.status(204).json("Utilisateur supprimé");
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la suppression", error });
  }
};

/**
 * Authentifie un utilisateur avec son email et son mot de passe
 * @param {*} req Objet de requête Express contenant les informations d'identification de l'utilisateur
 * @param {*} res Objet de réponse Express utilisé pour envoyer la réponse au client
 * @returns {Réponse}
 */
exports.authenticate = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie('token', token, { httpOnly: true, secure: true });

    res.json({ success: true, user, token });
  } catch (error) {
    res.status(500).json({ message: "Erreur de serveur lors de l'authentification" });
  }
};

