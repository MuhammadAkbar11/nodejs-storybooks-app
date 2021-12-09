const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const express = require("express");
const connectDB = require("./config/db");
// const connectDB = require

// Load config
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 3000;
const MODE = process.env.NODE_ENV;

app.listen(PORT, res => {
  console.log(`Server running ${MODE} mode on port ${PORT}`);
});
