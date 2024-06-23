const jwt = require('jsonwebtoken');
const User = require('../models/user');
const SECRET_KEY = process.env.SECRET_KEY;

exports.checkJWT = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token invalide' });
      } else {
        const user = await User.findById(decoded.userId);
        if (!user) {
          return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json({ message: 'Token requis' });
  }
};
