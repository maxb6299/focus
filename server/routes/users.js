const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  let data = [];
  const database = req.app.get("database");

  database
    .collection("users")
    .find()
    .forEach((element) => data.push(element))
    .then(() => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ error: "Internal server error" });
      console.log(err);
    });
});

router.post("/", (req, res) => {
  const data = req.body;
  const database = req.app.get("database");

  database
    .collection("users")
    .insertOne(data)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ error: "Internal server error" });
      console.log(err);
    });
});

module.exports = router;
