require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db"); // 👈 import connectDB

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to PostgreSQL
connectDB(); // 👈 test connection when server starts

// CORS config
const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "QuickNotes backend running with PostgreSQL connected" });
});

app.use("/api/auth", (req, res) =>
  res.status(501).json({ msg: "Auth routes not implemented yet" })
);
app.use("/api/notes", (req, res) =>
  res.status(501).json({ msg: "Notes routes not implemented yet" })
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
