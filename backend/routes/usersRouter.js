import express from "express";
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
import verifyOldPassword from "../middleware/veriftOldPassword.js";
import verifyCredentials from "../middleware/verifyCredentials.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "route is hit" });
});

router.post("/auth", verifyCredentials, authenticateUser);

router.post("/register", createNewUser);

router.use(passport.authenticate("jwt", { session: false }));
router.route("/:id").get(getUserInfo).delete(deleteUser);
router.put("/:id/email", updateEmail);
router.put("/:id/username", updateUsername);
router.put("/:id/password", verifyOldPassword, updatePassword);
router.put("/:id/first-name", updateFirstName);
router.put("/:id/last-name", updateLastName);
router.post("/refresh-token", validateRefreshToken, getNewAccessToken);

export default router;
