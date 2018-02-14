const jwt = require("jsonwebtoken");
const fs = require("fs");
const cert = fs.readFileSync("private.key");
const db = require("../db");

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  const token = req.headers.authorization.split(" ")[1];
  return jwt.verify(token, cert, (err, decoded) => {
    const { username, id } = decoded;
    if (err || !username || !id) {
      return res.status(401).end();
    }
    
    db("users")
      .distinct()
      .where("username", "=", username)
      .then(rows => {
        if (!rows || rows.length < 1) return res.status(401).end();
        if(rows[0].username != username || rows[0].id != id) return res.status(401).end()
        res.locals.id = id;
        return next();
      });
  });
};
