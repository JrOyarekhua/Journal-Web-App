// users server logic goes here

import { getUserById } from "../models/usersModel";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import bcrypt from "bcrypt";
configDotenv();
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
    return res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json(accessToken);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "internal server error", error: err });
  }
};
// get new access token
export const getNewAccessToken = async (req, res) => {
  // get the info from the requset body
  const { user } = req.body;
  if (!user) {
    res.status(404).json({ message: "user not found" });
  }
  //   issue a new jwt
  try {
    const newAccessToken = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error });
  }
};

// create a new user
export const createNewUser = async (req, res) => {
  // get the info from the request body
  const { email, password, first_name, last_name } = req.body;
  if (!email || !password || !first_name || !last_name) {
    return res.status(404).json({ message: "insufficient information" });
  }
  //   validate email
  const isValidEmail = await validateEmail(email);
  if (!isValidEmail) {
    return res.status(400).json({ message: "invalid email" });
  }

  //  hashpassword
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await db.query(
      "INSERT INTO users (email,password,first_name,last_name) VALUES($1,$2,$3,$4);",
      [email, hashedPassword, first_name, last_name]
    );
  } catch (err) {
    // catch errors from the
    return res
      .status(500)
      .send({ message: "internal server error", error: err.message });
  }
};

// get user from database
export const getUserInfo = async (req, res) => {};

// delete user from the database
export const deleteUser = async (req, res) => {};

//
