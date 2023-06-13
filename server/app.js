require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;

// --------- Controllers -------------
const users = require("./controllers/user.controller");
const decks = require("./controllers/deck.controller");
const flashCards = require("./controllers/flashCard.controller");

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
app.use("/deck", decks);
app.use("/flashcard", flashCards);

// Testing to see if PORT is connected. // WORKS!
app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}.`));
