const express = require('express'),
      path = require('path'),
      fs = require('fs'),
      bodyParser = require('body-parser'),
      app = express(),
      port = process.env.PORT || 3000,
      publicPath = path.resolve(__dirname);

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

// We point to our static assets
app.use('/', express.static(publicPath));

app.get('/:id', (req,res) => {
  console.log(req.params.id);
  res.send('foo');
});

app.post('/download', (req, res) => {

});

// And run the server
app.listen(port, function () {
  console.log('Server running on port ' + port);
});