require("dotenv").config(); // so this file uses .env file

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const usersRoute = require("./routes/users");
app.use("/users", usersRoute);

const loginRoute = require("./routes/login");
app.use("/login", loginRoute);

app.use((req, res) => {
  res.status(400).send("Bad Request");
});

const { getDatabase, connectToDatabase } = require("./database");
connectToDatabase((err) => {
  if (!err) {
    app.listen(PORT, () =>
      console.log(`Server started. Listening on port ${PORT}.`)
    );
    const database = getDatabase();
    app.set("database", database);
  } else {
    console.log(`Error starting server ${err}`);
  }
});
