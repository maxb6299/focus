require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());

app.listen(3000, () => console.log(`Server started. Listening on port 3000.`));
