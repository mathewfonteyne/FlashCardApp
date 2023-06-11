const mongoose = require("mongoose");

const DeckSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  owner_id: {
    type: String,
  },
});

module.exports = mongoose.model("Deck", DeckSchema);
