// users server logic goes here

import { getUserById } from "../models/usersModel";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
// authenticate user
export const authenticateUser = async (req, res) => {
  // get the email and password from the client
  const { email, password } = req.body;

  // validate the email and the password
  try {
    const user = await getUserById(email);
    if (!user) {
      return res.status(404).json({ message: "invalid email" });
    }
    const isValidPassword = await validatePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "invalid password" });
    }

    // sign both the access and refresh token
    const accessToken = jwt.sign(
      { user_id: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    const refreshToken = jwt.sign(
      { user_id: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    // send tokens back to the user
    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json(accessToken);
  } catch (err) {
    res.status(500).json({ message: "internal server error", error: err });
  }
};
//
export const getNewToken = async (req, res) => {
  //
};
