const router = require("express").Router();

const FlashCard = require("../models/flashCard.model");
const Deck = require("../models/deck.model");
const User = require("../models/user.model");
// Adding in the validateSession function
const validateSession = require("../middleware/validate-session");

//TODO Display all flash cards within a deck
router.get("/allflashcards/:deck_id", validateSession, async (req, res) => {
  try {
    const findDeck = await Deck.findOne({ _id: req.params.deck_id });
    const getAllFlashCards = await FlashCard.find({ deck: req.params.deck_id });
    if (!getAllFlashCards || !findDeck)
      throw new Error("Either No Deck or Flashcards Found!");
    res.status(200).json({
      message: "All Flashcards!",
      getAllFlashCards,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

//TODO Create a flashcard within a deck endpoint
// http://localhost:4040/flashcard/create/:deck_id
router.post("/create/:deck_id", validateSession, async (req, res) => {
  try {
    const findDeck = await Deck.findOne({ _id: req.params.deck_id });
    if (!findDeck) throw new Error("No Such Deck Exists");

    const flashCard = new FlashCard({
      front: req.body.front,
      back: req.body.back,
      deck: req.params.deck_id,
    });

    const newFlashCard = await flashCard.save();
    res.status(200).json({
      message: newFlashCard,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;
