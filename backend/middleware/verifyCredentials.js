import bcrypt from "bcrypt";
import { getUserByEmail, getUserbyUsername } from "../models/usersModel.js";
const verifyCredentials = async (req, res, next) => {
  //   get info from the body
  const { username, password, email } = req.body;
  if ((!username && !email) || !password) {
    return res
      .status(401)
      .json({ message: "username or email and password are required" });
  }
  try {
    let user;
    if (email) {
      user = await getUserByEmail(email);
      if (!user) {
        return res
          .status(401)
          .json({ message: "user not found with this email" });
      }
    } else if (username) {
      user = await getUserbyUsername(username);
      if (!user) {
        return res
          .status(401)
          .json({ message: "user not found with this password" });
      }
    }

    // validate password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "invalid password" });
    }

    // attach user to the request object
    req.user = user;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export default verifyCredentials;
