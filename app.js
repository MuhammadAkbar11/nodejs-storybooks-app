const dotenv = require("dotenv");
const path = require("path");
const express = require("express");

// Load config
dotenv.config({ path: path.resolve(__dirname, "/config/config.env") });

const app = express();

const PORT = process.env.PORT || 3000;
const MODE = process.env.NODE_ENV;

app.listen(PORT, res => {
  console.log(`Server running ${MODE} mode on port ${PORT}`);
});
