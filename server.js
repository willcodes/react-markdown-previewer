const express = require("express"),
  path = require("path"),
  fs = require("fs"),
  bodyParser = require("body-parser"),
  redis = require("redis"),
  client = redis.createClient(),
  app = express(),
  cors = require("cors"),
  port = process.env.PORT || 3003,
  publicPath = path.resolve(__dirname);

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.get("/favicon.ico", function(req, res) {});
app.use(bodyParser.json());
//just for dev localhost, must remove for prod
app.use(cors({ origin: true, credentials: true }));


app.get("/:id", (req, res) => {
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

app.post("/save", (req, res) => {
  client.set(req.body.docName, req.body.docContent, (err, reply) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    } else {
      res.send(reply);
    }
  });
});

app.listen(port, function() {
  console.log("Server running on port " + port);
});
