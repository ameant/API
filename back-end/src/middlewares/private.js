const jwt = require('jsonwebtoken');
const User = require('../models/user');

/**
 * Vérifie si le jeton JWT est valide et associe l'utilisateur correspondant à la requête.
 * Si le jeton est valide, ajoute `req.user` avec les informations de l'utilisateur.
 * Si le jeton est invalide ou s'il manque, envoie une réponse 401.
 * @param {express.Request} req Objet de requête Express pour récupérer le token
 * @param {express.Response} res Objet de réponse Express si l'accès est autorisé ou non
 * @param {express.NextFunction} next Fonction middleware Express, non utilisé ici mais respecte la structure standard des middlewares Express
 * @returns {Réponse}
 */
exports.checkJWT = async (req, res, next) => {
  try {
    let token;
    
    if (req.cookies && req.cookies.token) {
      console.log('Cookie token found');
      token = req.cookies.token;
    } 

    else if (req.headers && req.headers.authorization) {
      const authorization = req.headers.authorization;
      if (authorization.startsWith('Bearer ')) {
        console.log('Authorization header found');
        token = authorization.split(' ')[1];
      }
    }

    if (token) {
      console.log('Token found: ', token);
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log('Token decoded: ', decoded);

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
    console.error('Error in checkJWT:', error);
    if (error.name === 'JsonWebTokenError') {
    } else {
      res.status(401).json({ success: false, message: 'Accès non autorisé' });
    }
  }
};
