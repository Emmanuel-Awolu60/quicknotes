import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { pool } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();

// ✅ Test PostgreSQL connection
pool
  .connect()
  .then(() => console.log("✅ PostgreSQL connected successfully"))
  .catch((err) =>
    console.error("❌ PostgreSQL connection error:", err.message)
  );

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
