const authenticate = require("../controllers/authenticate.js");

const express = require("express");
const router = express.Router();

router.get("/settings", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const credential = authHeader.split(" ")[1];
    const database = req.app.get("database");
    const userId = await getUserId(credential);

    const userData = await database
      .collection("users")
      .findOne({ userId: userId });

    if (userData) {
      res.json(userData.settings);
      console.log("Successfully got user settings");
    } else {
      res.status(404).json({ error: "User not found" });
      console.log("User not found");
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting user settings" });
    console.log("Error getting user settings " + error);
  }
});

router.post("/settings", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const credential = authHeader.split(" ")[1];
    const database = req.app.get("database");
    const userId = await getUserId(credential);
    const userSettings = req.body.settings;

    const userData = await database
      .collection("users")
      .updateOne(
        { userId: userId },
        { $set: { settings: userSettings } },
        { upsert: true }
      );

    res.status(200).send("Success");
    console.log("Successfully updated user settings");
  } catch (error) {
    res.status(500).json({ error: "Error updating user settings" });
    console.log("Error updating user settings " + error);
  }
});

async function getUserId(credential) {
  try {
    let result = await authenticate.verify_credentials(credential);
    let userId = result.sub;

    return userId;
  } catch (error) {
    throw new Error("Authentication failed");
  }
}

module.exports = router;
