require("dotenv").config(); // so this file uses .env file

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const usersRoute = require("./routes/users");
app.use("/users", usersRoute);

const { getDatabase, connectToDatabase } = require("./database");
connectToDatabase((err) => {
  if (!err) {
    app.listen(process.env.PORT, () =>
      console.log(`Server started. Listening on port ${process.env.PORT}.`)
    );
    const database = getDatabase();
    app.set("database", database);
  }
});
