const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    deck_id: {
        // unique id for the deck
        type: String,
        required: true,
    },
    deckName: {
        type: String,
        required: true,
    },
    numberOfCards: { // for showing on a main page how many cards are in this deck
        type: String,
        required: false,
    },
});

module.exports = mongoose.model("Deck", UserSchema);
