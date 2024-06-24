const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });

    // Stocker le token dans un cookie HTTP
    res.cookie('token', token, { httpOnly: true });

    // Rediriger vers le tableau de bord
    res.redirect('/dashboard');
  } catch (err) {
    console.error('Erreur lors de l\'authentification :', err);
    res.status(500).json({ message: 'Erreur du serveur lors de l\'authentification' });
  }
});

module.exports = router;
