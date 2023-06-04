const mongoose = require("mongoose");

const DeckSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Deck", DeckSchema);
