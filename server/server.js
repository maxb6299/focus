require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());

app.listen(process.env.PORT, () =>
  console.log(`Server started. Listening on port ${process.env.PORT}.`)
);
