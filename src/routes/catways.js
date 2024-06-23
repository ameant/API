const express = require('express');
const router = express.Router();

const catwayController = require('../controllers/catways');
const catwayPrivate = require('../middlewares/private')
// Catway routes
router.get('/', catwayController.getCatways);
router.get('/:id', catwayController.getCatwayById);
router.post('/', catwayPrivate.checkJWT, catwayController.addCatway);
router.patch('/:id', catwayController.updateCatway);
router.delete('/:id', catwayPrivate.checkJWT, catwayController.deleteCatway);

const reservationController = require('../controllers/reservations');
const reservationPrivate = require('../middlewares/private')
// Reservation routes (sub-resource of catways)
router.get('/:id/reservations', reservationPrivate.checkJWT, reservationController.getReservations);
router.get('/:id/reservations/:idReservation', reservationController.getReservationById);
router.post('/:id/reservations', reservationPrivate.checkJWT, reservationController.addReservation);
router.delete('/:id/reservations/:idReservation', reservationPrivate.checkJWT, reservationController.deleteReservation);

// router.post('/authenticate', userController.authenticate);

module.exports = router;
