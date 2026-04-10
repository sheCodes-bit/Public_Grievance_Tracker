const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");

// DB connect
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static frontend
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/grievances", require("./routes/grievanceRoutes"));

// default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));