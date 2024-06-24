const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.checkJWT = async (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findById(decode.userId);

      if (!user) {
        return res.status(401).json({ success: false, message: 'Accès non autorisé' });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Erreur de vérification du token :', error);
      res.status(401).json({ success: false, message: 'Accès non autorisé' });
    }
  } else {
    console.log('Token manquant dans les cookies');
    res.status(401).json({ success: false, message: 'Accès non autorisé' });
  }
};