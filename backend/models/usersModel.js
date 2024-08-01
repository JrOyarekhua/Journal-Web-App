import db from "../db.js";
export const getUserById = async (user_id) => {
  const result = await db.query(`SELECT * FROM users WHERE user_id=$1;`, [
    user_id,
  ]);
  return result.rows[0];
};
