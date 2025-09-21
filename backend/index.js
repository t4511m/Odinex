// Load environment variables from .env file
require("dotenv").config();

// index.js
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const keys = require("./config/keys");

// Load models and passport configuration
require("./models/User");
require("./services/passport");

const app = express();

// Middleware setup
app.use(
  session({
    secret: keys.cookieKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      secure: false, // true if HTTPS in production
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose
  .connect(keys.mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes registration
require("./routes/authRoutes")(app);

// Start server
app.listen(keys.port, () => {
  console.log(`Server running on port ${keys.port}`);
});
