const express = require("express");
const router = express.Router();
import passport from "passport";
import passportConfig from "../passportConfig.js";
import {
  authenticateUser,
  getNewToken,
} from "../controllers/usersController.js";

router.post("/auth", authenticateUser);

router.post("/register", createNewUser);

router.use(passport.authenticate(("jwt", { session: false })));
router.route("/:id").get(getUserInfo).put(updateUserInfo).delete(deleteUser);
router.post("/refresh-token", validateExpiredToken, getNewToken);

module.exports = router;
