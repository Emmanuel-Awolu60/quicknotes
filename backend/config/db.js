const { Pool } = require("pg");
require("dotenv").config();

// Create a new connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Function to test connection
const connectDB = async () => {
  try {
    await pool.connect();
    console.log("✅ PostgreSQL connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1); // stop app if DB fails
  }
};

module.exports = { pool, connectDB };
