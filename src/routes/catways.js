const express = require("express");
const router = express.Router();

const catwayController = require("../controllers/catways");
const catwayPrivate = require("../middlewares/private");
// Routes des catways
router.get("/", catwayController.getCatways);
router.get("/:id", catwayPrivate.checkJWT, catwayController.getCatwayById);
router.post("/", catwayPrivate.checkJWT, catwayController.addCatway);
router.put("/:id", catwayController.updateCatway);
router.patch("/:id", catwayController.updateCatway);
router.delete("/:id", catwayPrivate.checkJWT, catwayController.deleteCatway);

const reservationController = require("../controllers/reservations");
const reservationPrivate = require("../middlewares/private");
// Routes des réservations
router.get(
  "/:id/reservations",
  reservationPrivate.checkJWT,
  reservationController.getReservations
);
router.get(
  "/:id/reservations/:idReservation",
  reservationController.getReservationById
);
router.post(
  "/:id/reservations",
  reservationPrivate.checkJWT,
  reservationController.addReservation
);
router.delete(
  "/:id/reservations/:idReservation",
  reservationPrivate.checkJWT,
  reservationController.deleteReservation
);

module.exports = router;
