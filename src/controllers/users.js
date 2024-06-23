const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.addUser = async (req, res, next) => {
  const temp = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    let user = await User.create(temp);

    return res.status(201).json(user);
  } catch (error) {
    return res.status(501).json(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const id = req.params.id;
  const temp = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    let user = await User.findById({ _id: id });

    if (user) {
      Object.keys(temp).forEach((key) => {
        if (!!temp[key]) {
          user[key] = temp[key];
        }
      });

      await user.save();
      return res.status(201).json(user);
    }

    return res.status(404).json("user_not_found");
  } catch (error) {
    return res.status(501).json(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    await User.deleteOne({ _id: id });

    return res.status(204).json("delete_ok");
  } catch (error) {
    return res.status(501).json(error);
  }
};

exports.authenticate = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res.json({ success: true, user, token });
  } catch (error) {
    console.error("Erreur d'authentification :", error);
    res
      .status(500)
      .json({ message: "Erreur de serveur lors de l'authentification" });
  }
};
