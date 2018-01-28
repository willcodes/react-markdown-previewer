var express = require("express");
let AuthRouter = express.Router();
var passport = require("passport");

AuthRouter.route("/")
  .post((req, res, next) =>
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.status(401).send({ message: "bad username or password" });
      }
      if (user) {
        res
          .status(200)
          .send({ success: true, message: "user is logged in", token: user });
      }
    })(req, res, next)
  )
  .get((req, res, next) => {
    res.status(200).send({ success: true });
  });

module.exports = AuthRouter;
