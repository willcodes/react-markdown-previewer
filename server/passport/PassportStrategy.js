const LocalStrategy = require("passport-local").Strategy;
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cert = fs.readFileSync("private.key");

module.exports = new LocalStrategy((username, password, done) => {
  db("users")
    .distinct()
    .where("username", "=", username)
    .then(rows => {
      if (!rows || rows.length < 1) return done(null, false);
      if (!bcrypt.compareSync(password, rows[0].password))
        return done(null, false);
      const token = jwt.sign(
        { username: rows[0].username, id: rows[0].id },
        cert
      );
      return done(null, token);
    });
});
