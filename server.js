//dependencies for server
const express = require("express"),
  path = require("path"),
  fs = require("fs"),
  bodyParser = require("body-parser"),
  redis = require("redis"),
  client = redis.createClient(),
  app = express(),
  cors = require("cors"),
  port = process.env.PORT || 3003,
  passport = require("passport"),
  db = require("./server/db"),
  dotenv = require("dotenv"),
  publicPath = path.resolve(__dirname);

//routes and local imports
const PublicRouter = require("./server/routes/PublicRouter"),
  UserRouter = require("./server/routes/UserRouter"),
  AuthRouter = require("./server/routes/AuthRouter"),
  AuthMiddleware = require("./server/middleware/AuthMiddleware"),
  PassportStrategy = require("./server/passport/PassportStrategy")


dotenv.config();

//just for dev localhost, must remove for prod
app.use(cors({ origin: true, credentials: true }));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(PassportStrategy);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.get("/favicon.ico", function (req, res) { });
app.use(bodyParser.json());

app.use("/api/public", PublicRouter);
app.use("/api/users", UserRouter);
app.use("/api/login", AuthRouter);
app.use("/api/validate", AuthMiddleware, (req, res) => {
  res.status(200).send({
    success: true,
    message: 'valid token'
  })
});
app.use("/api/dashboard", AuthMiddleware, (req, res) => {
  console.log('yoyoyoyooyo');
  res.sendStatus(200);
})

app.listen(port, function () {
  console.log("Server running on port " + port);
});
