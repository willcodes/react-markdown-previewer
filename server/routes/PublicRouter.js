var express = require("express");
var redis = require("redis");
var client = redis.createClient();
let PublicRouter = express.Router();

PublicRouter.route("/:id").get((req, res) => {
  let documentKey = req.params.id;
  client.get(documentKey, (err, reply) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    } else {
      if (reply) {
        res.send(reply);
      } else {
        res.send("");
      }
    }
  });
});

PublicRouter.route("/save").post((req, res) => {
  client.set(req.body.docName, req.body.docContent, (err, reply) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    } else {
      res.send(reply);
    }
  });
});

module.exports = PublicRouter;
