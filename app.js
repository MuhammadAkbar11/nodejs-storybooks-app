const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const express = require("express");
const passport = require("passport");
const connectDB = require("./config/db");
const exphbs = require("express-handlebars");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectFlash = require("connect-flash");
const hbsHelpers = require("./helpers/hbs");
const mainRoutes = require("./routes/index");
const storyRoutes = require("./routes/story");
const authRoutes = require("./routes/auth");
const {
  NODE_ENV,
  DEV_MODE,
  SESSION_SECRET,
  PORT,
  MONGO_URI,
} = require("./utils/contants");

// Load config
dotenv.config({ path: "./config/config.env" });

// Passport config
require("./config/passport")(passport);

connectDB();

const app = express();
const store = MongoStore.create({
  mongoUrl: MONGO_URI,
  collection: "sessions",
});

// Body Parse
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Flash
app.use(connectFlash());

if (NODE_ENV === DEV_MODE) {
  app.use(morgan("dev"));
}

// Handlebars
app.engine(
  "hbs",
  exphbs.engine({ helpers: hbsHelpers, defaultLayout: "main", extname: ".hbs" })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views/"));

// Session

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    store: store,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session({}));
app.use((req, res, next) => {
  if (req.user) {
    res.locals.userAuth = req.user;
  } else {
    res.locals.userAuth = null;
  }

  next();
});

app.use(express.static(path.join(__dirname, "assets")));

// Routes
app.use("/", mainRoutes);
app.use("/auth", authRoutes);
app.use("/stories", storyRoutes);

const MODE = NODE_ENV;

app.listen(PORT, res => {
  console.log(`Server running ${MODE} mode on port ${PORT}`);
});
