const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.checkJWT = async (req, res, next) => {
  try {
    let token;
    
    // Vérifier d'abord les cookies
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } 
    
    // Si pas de token dans les cookies, vérifier les headers Authorization
    else if (req.headers && req.headers.authorization) {
      const authorization = req.headers.authorization;
      if (authorization.startsWith('Bearer ')) {
        token = authorization.split(' ')[1];
      }
    }

    // Si le token est récupéré
    if (token) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(401).json({ success: false, message: 'Accès non autorisé' });
      }

      req.user = user;
      next();
    } else {
      res.status(401).json({ success: false, message: 'Accès non autorisé' });
    }
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
    } else {
      res.status(401).json({ success: false, message: 'Accès non autorisé' });
    }
  }
};
