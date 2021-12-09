const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const express = require("express");
const passport = require("passport");
const connectDB = require("./config/db");
const exphbs = require("express-handlebars");
const session = require("express-session");
// const connectDB = require
const mainRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");

// Load config
dotenv.config({ path: "./config/config.env" });

// Passport config
require("./config/passport")(passport);

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Handlebars
app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views/"));

// Session

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session({}));

app.use(express.static(path.join(__dirname, "assets")));

// Routes
app.use("/", mainRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
const MODE = process.env.NODE_ENV;

app.listen(PORT, res => {
  console.log(`Server running ${MODE} mode on port ${PORT}`);
});
