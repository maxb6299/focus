const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  let data = [];
  const database = req.app.get("database");

  try {
    await database
      .collection("users")
      .find()
      .forEach((element) => data.push(element));

    res.json(data);
  } catch (err) {
    res.json({ error: "Internal server error" });
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  const data = req.body;
  const database = req.app.get("database");

  try {
    const result = await database.collection("users").insertOne(data);
    res.json(result);
  } catch (err) {
    res.json({ error: "Internal server error" });
    console.log(err);
  }
});

module.exports = router;
