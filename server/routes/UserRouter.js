var express = require("express");
var redis = require("redis");
var client = redis.createClient();
var db = require("../db");
const passport = require("passport");
const bcrypt = require("bcrypt");
const saltRounds = 10;
// const passwordHash = bcrypt.hashSync(myPlaintextPassword, salt);

let UserRouter = express.Router();

UserRouter.route("/").post((req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({
      message: "bad request, no username or password provided"
    });
  } else {
    let pw = bcrypt.hashSync(password, saltRounds);
    db("users")
      .insert([
        {
          username,
          password: pw
        }
      ])
      .then(response => {
        res.status(200).send({
          success: true,
          message: "user created"
        });
      })
      .catch(err => {
        res.status(500).send({
          success: false,
          error: err
        });
        console.log(err);
      });
  }
});

module.exports = UserRouter;
