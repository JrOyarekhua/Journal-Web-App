const express = require("express");
const router = express.Router();
import passport from "passport";
import passportConfig from "../passportConfig.js";
import validateRefreshToken from "../middleware/validateRefreshToken.js";
import {
  authenticateUser,
  getNewAccessToken,
} from "../controllers/usersController.js";

router.post("/auth", authenticateUser);

router.post("/register", createNewUser);

router.use(passport.authenticate(("jwt", { session: false })));
router.route("/:id").get(getUserInfo).delete(deleteUser);
router.put("/:id/email", updateEmail);
router.put("/:id/password", updatePassword);
router.put("/:id/first-name", updateFirstName);
router.put("/:id/last-name", updateLastName);
router.post("/refresh-token", validateRefreshToken, getNewAccessToken);

module.exports = router;
