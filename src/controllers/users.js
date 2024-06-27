const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.addUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.create({ name, email, password });
    return res.status(201).json(user);
  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(500).json({ message: "Error adding user", error });
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;

  try {
    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json("Utilisateur non trouvé");
    }

    // Mettre à jour les propriétés non vides de l'utilisateur
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Error updating user", error });
  }
};

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
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Error deleting user", error });
  }
};

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

    console.log('Secret Key:', process.env.SECRET_KEY);
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    console.log('Generated token:', token);

    // Utiliser un cookie
    res.cookie('token', token, { httpOnly: true, secure: true });

    res.json({ success: true, user, token });
  } catch (error) {
    console.error("Erreur d'authentification :", error);
    res.status(500).json({ message: "Erreur de serveur lors de l'authentification" });
  }
};

