const express = require("express");
const router = express.Router();
import passport from "passport";
import passportConfig from "../passportConfig.js";

router.post("/auth", authenticateUser);

router.post("/register", createNewUser);

router.use(passport.authenticate(("jwt", { session: false })));
router.route("/:id").get(getUserInfo).put(updateUserInfo).delete(deleteUser);

module.exports = router;
