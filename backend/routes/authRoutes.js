const passport = require("passport");

module.exports = (app) => {
  // Google OAuth route
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  // Google OAuth callback route
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/dashboard"); // Redirect to dashboard or desired route after successful login
    }
  );

  // Logout route
  app.get("/api/logout", (req, res) => {
    req.logout(() => {
      res.redirect("/"); // Redirect to homepage after logout
    });
  });

  // Current user route
  app.get("/api/current_user", (req, res) => {
    res.send(req.user); // Send the current user data
  });
};
