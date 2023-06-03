require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;

// --------- Controllers -------------
const users = require("./controllers/user.controller");

// Adding in cors dependency
const cors = require("cors");

const MONGO = process.env.MONGODB;
const mongoose = require("mongoose");
mongoose.connect(`${MONGO}`);
const db = mongoose.connection;

app.use(express.json());
app.use(cors());
db.once("open", () => console.log(`Connected: ${MONGO}`));

// ---------------- Routes to Controllers --------------- //
app.use("/user", users);

// Testing to see if PORT is connected. // WORKS!
app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}.`));
