const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

exports.PORT = process.env.PORT || 3000;
exports.MONGO_URI = process.env.MONGO_URI;
exports.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
exports.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
exports.DEV_MODE = "development";
exports.PRODUCTION_MODE = "production";
exports.NODE_ENV = process.env.NODE_ENV;
exports.SESSION_SECRET = process.env.SESSION_SECRET;
