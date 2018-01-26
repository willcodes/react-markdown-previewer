const express = require('express'),
      path = require('path'),
      fs = require('fs'),
      bodyParser = require('body-parser'),
      redis = require('redis'),
      client = redis.createClient(),
      app = express(),
      cors = require('cors'),
      port = process.env.PORT || 3003,
      publicPath = path.resolve(__dirname);

app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/favicon.ico', function (req, res) {
});

app.use(bodyParser.json());

app.use(cors({origin:true,credentials: true}));

//endpoint to get get key based on query string
app.get('/:id', (req,res) => {
  let documentKey = req.params.id;
  client.get(documentKey, (err, reply) => {
    if(reply) {
      console.log(reply);
      res.send(reply);
    }
    else {
      res.send("")
    }
  })
});

//endpoint to save to redis
app.post('/save', (req, res) => {
  client.set(req.body.docName, req.body.docContent,(err, reply) => {
    if(err) {
      res.send(err)
    } 
    else {
      res.send(reply);
    }
  })
});

// And run the server
app.listen(port, function () {
  console.log('Server running on port ' + port);
});
