require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS config: only allow our frontend origin (safer than '*')
const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // enable CORS
app.use(express.json()); // parse JSON bodies

// Basic health route
app.get("/", (req, res) => {
  res.json({ message: "QuickNotes backend running" });
});

// Placeholder for routes (we'll create these files next steps)
app.use("/api/auth", (req, res) =>
  res.status(501).json({ msg: "Auth routes not implemented yet" })
);
app.use("/api/notes", (req, res) =>
  res.status(501).json({ msg: "Notes routes not implemented yet" })
);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
