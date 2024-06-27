const express = require("express");
const router = express.Router();

const userController = require("../controllers/users");

const userPrivate = require('../middlewares/private');

router.post("/add", userPrivate.checkJWT, userController.addUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userPrivate.checkJWT, userController.deleteUser);

router.post('/authenticate', userController.authenticate);

module.exports = router;
