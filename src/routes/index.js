const express = require('express');
const router = express.Router();

const userRoute = require('./users');
const authRoute = require('./auth');
const dashboardRoute = require('./dashboard');
const catwayRoute = require('./catways');

// Page d'accueil
router.get('/', (req, res) => {
  res.render('index');
});

router.use('/users', userRoute);
router.use('/auth', authRoute);
router.use('/dashboard', dashboardRoute);
router.use('/catways', catwayRoute);

module.exports = router;
