const mongoose = require("mongoose");

const FlashCardSchema = new mongoose.Schema({
  front: {
    type: String,
    required: true,
  },
  back: {
    type: String,
    required: true,
  },
  deck: {
    type: String,
  },
  owner_id: {
    type: String,
  },
});

module.exports = mongoose.model("FlashCard", FlashCardSchema);
