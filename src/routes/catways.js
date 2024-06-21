const express = require('express');
const router = express.Router();

const catwayService = require('../services/catways');
// Catway routes
router.get('/', catwayService.getCatways);
router.get('/:id', catwayService.getCatwayById);
router.post('/', catwayService.addCatway);
router.patch('/:id', catwayService.updateCatway);
router.delete('/:id', catwayService.deleteCatway);

const reservationService = require('../services/reservations');
// Reservation routes (sub-resource of catways)
router.get('/:id/reservations', reservationService.getReservations);
router.get('/:id/reservations/:idReservation', reservationService.getReservationById);
router.post('/:id/reservations', reservationService.addReservation);
router.delete('/:id/reservations/:idReservation', reservationService.deleteReservation);

module.exports = router;
