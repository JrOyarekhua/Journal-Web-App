const express = require("express");
const router = express.Router();
import passport from "passport";
import "../passportConfig.js";
import validateRefreshToken from "../middleware/validateRefreshToken.js";
import {
  authenticateUser,
  getNewAccessToken,
  getUserInfo,
  deleteUser,
  createNewUser,
  updatePassword,
  updateUsername,
  updateEmail,
  updateFirstName,
  updateLastName,
} from "../controllers/usersController.js";
import { verifyCredentials } from "../middleware/verifyCredentials.js";
import verifyOldPassword from "../middleware/veriftOldPassword.js";

router.post("/auth", verifyCredentials, authenticateUser);

router.post("/register", createNewUser);

router.use(passport.authenticate(("jwt", { session: false })));
router.route("/:id").get(getUserInfo).delete(deleteUser);
router.put("/:id/email", updateEmail);
router.put("/:id/username", updateUsername);
router.put("/:id/password", verifyOldPassword, updatePassword);
router.put("/:id/first-name", updateFirstName);
router.put("/:id/last-name", updateLastName);
router.post("/refresh-token", validateRefreshToken, getNewAccessToken);

export default usersRouter;
