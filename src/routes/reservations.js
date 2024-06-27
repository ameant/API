const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

const reservationController = require("../controllers/reservations");
const reservationPrivate = require("../middlewares/private");


router.get(
  "/",
  reservationPrivate.checkJWT,
  reservationController.getReservations
);
router.get("/:id", reservationController.getReservationById);
router.post(
  "/",
  reservationPrivate.checkJWT,
  reservationController.addReservation
);
router.delete(
  "/:id",
  reservationPrivate.checkJWT,
  reservationController.deleteReservation
);

router.post("/authenticate", userController.authenticate);

module.exports = router;
