import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  user: "quicknotes_user",
  host: "localhost",
  database: "quicknotes_db",
  password: "password123",
  port: 5432,
});
