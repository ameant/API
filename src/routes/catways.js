const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

const catwayController = require("../controllers/catways");
const catwayPrivate = require("../middlewares/private");

router.get("/", catwayPrivate.checkJWT, catwayController.getCatways);
router.get("/:id", catwayController.getCatwayById);
router.post("/", catwayPrivate.checkJWT, catwayController.addCatway);
router.put("/:id", catwayController.updateCatway);
router.patch("/:id", catwayController.updateCatway);
router.delete("/:id", catwayPrivate.checkJWT, catwayController.deleteCatway);

router.post('/authenticate', userController.authenticate);

module.exports = router;
