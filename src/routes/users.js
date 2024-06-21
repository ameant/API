const express = require("express");
const router = express.Router();

const userService = require("../services/users");

router.post("/add", userService.addUser);
router.patch("/:id", userService.updateUser);
router.delete("/:id", userService.deleteUser);

module.exports = router;
