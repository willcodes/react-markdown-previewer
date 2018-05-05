var express = require("express");
var db = require("../db");
let DocumentRouter = express.Router();

DocumentRouter.route("/user").get((req, res) => {
  const { id } = res.locals;
  db("documents")
    .select(["title", "content", "id"])
    .where({ user_id: id })
    .then(data => {
      res.status(200).send(data);
    });
});

DocumentRouter.route("/:id").get((req, res) => {
  const user_id = res.locals.id;
  const document_id = req.params.id;
  db("documents")
    .select(["title", "content", "id"])
    .where({ user_id, id: document_id })
    .then(data => {
      if (data[0]) {
        res.status(200).send(data[0]);
      } else {
        res
          .status(401)
          .send({ success: false, error: "document does not belong to user" });
      }
    })
    .catch(err => {
      res.status(500).send({ success: false, error: "internal server error" });
    });
});

DocumentRouter.route("/save").post((req, res) => {
  const user_id = res.locals.id;
  const { id, content, title } = req.body;

  db("documents")
    .select(["title", "content", "id"])
    .where({ user_id, id: id })
    .then(data => {
      if (data[0]) {
        db("documents")
          .where({ user_id, id: id })
          .update({
            content,
            title
          })
          .then(success => res.status(200).send({ success }))
          .catch(err => {
            res
              .status(500)
              .send({ success: false, error: "Error retrieving doc" });
          });
      } else {
        res
          .status(401)
          .send({ success: false, error: "document does not belong to user" });
      }
    })
    .catch(err => {
      res.status(500).send({ success: false, error: "internal server error" });
    });
});

DocumentRouter.route("/add").post((req, res) => {
  const { id } = res.locals;
  const { title = "Untitled Document", content = "" } = req.body;
  db("documents")
    .insert({
      user_id: id,
      title,
      content
    })
    .returning("id")
    .then(data => {
      res
        .status(200)
        .send({ success: true, message: "added document successfully", data });
    })
    .catch(err => {
      res
        .status(500)
        .send({ success: false, message: "error with adding document" });
    });
});

DocumentRouter.route("/delete").post((req, res) => {
  const { id } = res.locals;
  const { document_id } = req.body;
  db("documents")
    .select(["id"])
    .where({ user_id: id })
    .then(data => {
      if (data[0]) {
        db("documents")
          .where("id", document_id)
          .del()
          .then(data => {
            res
              .status(200)
              .send({ message: "deleted successfully", success: true });
          });
      } else {
        res
        .status(401)
        .send({ message: "Unauthorized to modify document", success: false });
      }
    });
});

module.exports = DocumentRouter;
