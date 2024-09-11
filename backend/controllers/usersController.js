// users server logic goes here

import {
  getUserById,
  insertNewEmail,
  insertNewFirstName,
  insertNewLastName,
  insertNewUser,
  insertNewUsername,
  validateEmail,
  validateUsername,
} from "../models/usersModel.js";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import bcrypt from "bcrypt";
configDotenv();
// authenticate user
export const authenticateUser = async (req, res) => {
  //   get info from the user object
  const { username, email, user_id } = req.user;

  try {
    // sign both the access and refresh token
    const accessToken = jwt.sign(
      { user_id: user_id, email: email, username: username },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    const refreshToken = jwt.sign(
      { user_id: user_id, email: email, username: username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    // send tokens back to the user
    return res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? true : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ message: "sign in successful", accessToken: accessToken });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "internal server error", error: err.message });
  }
};
// get new access token
export const getNewAccessToken = async (req, res) => {
  // get the info from the requset body
  const { user } = req.body;
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  const { password, ...userWithoutPassword } = user;
  //   issue a new jwt
  try {
    const newAccessToken = jwt.sign(
      userWithoutPassword,
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export const logout = async (req, res) => {
  if (!req.cookies.refreshToken) {
    return res.status(400).json({ message: "no refresh token found" });
  }
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? true : "lax",
  });

  return res.status(200).json({ message: "user succesfully logged out" });
};

// create a new user
export const createNewUser = async (req, res) => {
  console.log("route hit");
  // get the info from the request body
  const { email, password, first_name, last_name, username } = req.body;
  if (!email || !password || !first_name || !last_name || !username) {
    return res.status(404).json({ message: "insufficient information" });
  }
  console.log(req.body);
  //   validate email
  const isValidEmail = await validateEmail(email);
  if (!isValidEmail) {
    return res.status(400).json({ message: "invalid email" });
  }

  //   validate username
  const isValidUsername = await validateUsername(username);
  if (!isValidUsername) {
    return res.status(400).json({ message: "invalid username" });
  }

  //  hashpassword
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(hashedPassword);
  try {
    const newUser = await insertNewUser(
      email,
      username,
      hashedPassword,
      first_name,
      last_name
    );

    const { password, ...userWithoutPassword } = newUser;
    const accessToken = jwt.sign(userWithoutPassword, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    const refreshToken = jwt.sign(
      userWithoutPassword,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    return res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? true : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ message: "user successfully created", accessToken: accessToken });
  } catch (err) {
    // catch errors from the
    return res
      .status(500)
      .send({ message: "internal server error", error: err.message });
  }
};

// get user from database
export const getUserInfo = async (req, res) => {
  const { user_id } = req.body;
  try {
    if (!user_id) {
      return res.status(400).json({ message: "user ID required" });
    }
    const user = await getUserById(user_id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const { password, ...userWithoutPassword } = user;
    return res.status(200).json(userWithoutPassword);
  } catch (err) {
    return res.status(500).json({ message: "internal server error" });
  }
};

// delete user from the database
export const deleteUser = async (req, res) => {
  const { user_id } = req.body;
  if (!user_id) {
    return res.status(404).json({ message: "user ID required" });
  }
  try {
    const user = await getUserById(user_id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    await deleteUser(user_id);
    return res.status(200).json({ message: "user succesfully deleted" });
  } catch (err) {
    return res.status(500).json({ message: "internal server error" });
  }
};

//updete email
export const updateEmail = async (req, res) => {
  const { newEmail } = req.body;
  const { userId } = req.params;
  if (!newEmail) {
    return res.status(400).json({ message: "new email required" });
  }

  try {
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found with ID" });
    }
    const isValidEmail = await validateEmail(newEmail);
    if (!isValidEmail) {
      return res.status(400).json({ message: "email already in use" });
    }
    await insertNewEmail(newEmail, userId);
    res.status(200).json({ message: "email succesfully changed" });
  } catch (err) {
    return res.status(500).json({ message: "internal server error" });
  }
};

// update username
export const updateUsername = async (req, res) => {
  const { newUsername } = req.body;
  const { userId } = req.params;
  if (!newUsername) {
    return res.status(400).json({ message: "new username required" });
  }

  try {
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found with ID" });
    }
    const isValidUsername = await validateUsername(newUsername);
    if (!isValidUsername) {
      return res.status(400).json({ message: "username is already in use" });
    }
    await insertNewUsername(newUsername, userId);
    res.status(200).json({ message: "username succesfully changed" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

// update password
export const updatePassword = async (req, res) => {
  const { userId } = req.params;
  const { newPassword } = req.body;
  try {
    await insertNewPassword(userId, newPassword);
    return res.status(200).json({ message: "password succesfully changed" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export const updateFirstName = async (req, res) => {
  const { newFirstName } = req.body;
  const { userId } = req.params;
  if (!newFirstName) {
    return res.status(400).json({ message: "new first name is required" });
  }

  try {
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found with ID" });
    }
    await insertNewFirstName(newFirstName, userId);
    res.status(200).json({ message: "first name succesfully changed" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export const updateLastName = async (req, res) => {
  const { newLastName } = req.body;
  const { userId } = req.params;
  if (!newLastName) {
    return res.status(400).json({ message: "new last name is required" });
  }

  try {
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found with ID" });
    }
    await insertNewLastName(newLastName, id);
    res.status(200).json({ message: "last name succesfully changed" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};
