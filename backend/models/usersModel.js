import db from "../db.js";
export const getUserById = async (user_id) => {
  try {
    const result = await db.query(`SELECT * FROM users WHERE user_id=$1;`, [
      user_id,
    ]);
    return result.rows[0];
  } catch (error) {
    throw new Error(
      "error selecting content from the database: " + error.message
    );
  }
};

export const getUserByEmail = async (email) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE email =$1", [
      email,
    ]);
    return result.rows[0];
  } catch (error) {
    throw new Error(
      "error selecting content from the database: " + error.message
    );
  }
};

export const getUserbyUsername = async (username) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    return result.rows[0];
  } catch (error) {
    throw new Error(
      "error selecting content from the database: " + error.message
    );
  }
};

export const validateEmail = async (email) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    return result.rowCount > 0;
  } catch (error) {
    throw new Error(
      "error selecting content from the database: " + error.message
    );
  }
};

export const validateUsername = async (username) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE username=$1", [
      username,
    ]);
    return result.rowCount > 0;
  } catch (error) {
    throw new Error(
      "error selecting content from the database: " + error.message
    );
  }
};

export const insertNewUser = async (
  email,
  username,
  password,
  first_name,
  last_name
) => {
  try {
    await db.query(
      "INSERT INTO users (email,username,first_name,last_name,password) VALUES ($1,$2,$3,$4,$5)",
      [email, username, password, first_name, last_name]
    );
  } catch (error) {
    throw new Error(
      "error inserting new user into the database: " + error.message
    );
  }
};

export const deleteUser = async (user_id) => {
  try {
    await db.query("DELETE FROM users WHERE user_id=$1", [user_id]);
  } catch (error) {
    throw new Error("Error deleting user from the database: " + error.message);
  }
};

export const insertNewEmail = async (newEmail, user_id) => {
  try {
    await db.query("UPDATE users SET email=$1 WHERE user_id=$2", [
      newEmail,
      user_id,
    ]);
  } catch (error) {
    throw new Error("error updating email: " + error.message);
  }
};

export const insertNewUsername = async (newUsername, user_id) => {
  try {
    await db.query("UPDATE users SET username=$1 WHERE user_id=$2", [
      newUsername,
      user_id,
    ]);
  } catch (error) {
    throw new Error("error updating email: " + error.message);
  }
};

export const insertNewPassword = async (newPassword, user_id) => {
  try {
    await db.query("UPDATE users SET password=$1 WHERE user_id=$2", [
      newPassword,
      user_id,
    ]);
  } catch (error) {
    throw new Error("error updating password: " + error.message);
  }
};

export const insertNewFirstName = async (newFirstName, user_id) => {
  try {
    await db.query("UPDATE users SET first_name=$1 WHERE user_id=$2", [
      newFirstName,
      user_id,
    ]);
  } catch (error) {
    throw new Error("error updating first name: " + error.message);
  }
};

export const insertNewLastName = async (newLastName, user_id) => {
  try {
    await db.query("UPDATE users SET last_name=$1 WHERE user_id=$2", [
      newLastName,
      user_id,
    ]);
  } catch (error) {
    throw new Error("error updating password: " + error.message);
  }
};
