import pg from "pg";
const { Pool } = pg;
import { configDotenv } from "dotenv";
configDotenv();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

const test = async () => {
  try {
    const result = await pool.query("SELECT * from users;");
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export default pool;
