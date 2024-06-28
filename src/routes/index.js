const express = require("express");
const router = express.Router();

const userRoute = require("./users");
const authRoute = require("./auth");
const catwayRoute = require("./catways");
const reservationRoute = require("./reservations");

// Page d'accueil
router.get("/", (res) => {
  res.render("index");
});

router.use("/users", userRoute);
router.use("/auth", authRoute);
router.use("/catways", catwayRoute);
router.use("/reservations", reservationRoute);

module.exports = router;
