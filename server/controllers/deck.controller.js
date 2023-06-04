const router = require("express").Router();
const validateSession = require("../middleware/validate-session");
const Deck = require("../models/deck.model");

//TODO Create an endpoint that creates a new deck of cards
router.post("/", validateSession, async (req, res) => {
  try {
    const deck = new Deck({
      category: req.body.category,
    });

    const newDeck = await deck.save();

    res.status(200).json({
      deck: newDeck,
      message: "You have successfully created a new Flashcard Deck!",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;
