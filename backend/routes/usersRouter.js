const express = require("express");
const router = express.Router();

router.post("/auth", authenticateUser);

router.post("/register", createNewUser);

router.route("/:id").get(getUserInfo).put(updateUserInfo).delete(deleteUser);

module.exports = router;
