var express = require("express");
var db = require("../db");
let DocumentRouter = express.Router();

DocumentRouter.route("/user").get((req, res) => {
    const { id } = res.locals
    const a = db("documents").select(['title', 'content']).where({user_id:id}).then(data => {
        res.status(200).send({data});
    })
});

module.exports = DocumentRouter;
