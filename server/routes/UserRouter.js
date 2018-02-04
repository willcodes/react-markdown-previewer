var express = require("express");
var redis = require("redis");
var client = redis.createClient();
var db = require("../db");
const passport = require("passport");
const bcrypt = require("bcrypt");
const saltRounds = 10;
// const passwordHash = bcrypt.hashSync(myPlaintextPassword, salt);

let UserRouter = express.Router();

/**
 * @api {post} /api/users Request User information
 * @apiName Create User
 * @apiGroup Users
 * @apiParam {String} username username
 * @apiParam {String} password password, no current requirements for length/complexity
 * @apiParam {String} email email adddress,again no validation for now.
 * @apiHeader {String}  Authorization: Bearer <Token>
 * @apiSuccess {Boolean} success if fetch was successful
 * @apiSuccess {String} message Information about user creation
 * @apiError InvalidRequest No username or password provided
 * @apiError InvalidUsername Username is invalid
 */

UserRouter.route("/").post((req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    res.status(400).send({
      message: "bad request, no username, password or email provided"
    });
  } else {
    let pw = bcrypt.hashSync(password, saltRounds);
    db("users")
      .insert([
        {
          username,
          password: pw,
          email
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
