import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Received token:", token); // ✅ log token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // ✅ log decoded info

    const userResult = await pool.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [decoded.id]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = userResult.rows[0];
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(401).json({ message: "Token failed or expired" });
  }
};
