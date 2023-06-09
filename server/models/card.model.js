const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    front: {
        type: String,
        required: true,
    },
    rear: {
        type: String,
        required: true,
    },
    starred: { // used for saving or bookmarking cards for later review
        type: String,
        required: false,
    },
    deck_id: { // which cards belong to which deck
        type: String,
        required: true,
    },
    image: { // for media
        type: String,
        required: false,
    },
    owner_id: { // so only the creator will be allowed to delete
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Card", UserSchema);
