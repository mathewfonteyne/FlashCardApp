const router = require("express").Router();
const validateSession = require("../middleware/validate-session");
const Deck = require("../models/deck.model");

//TODO Create an Endpoint that gets all Decks created
// http://localhost:4040/deck/
router.get("/", validateSession, async (req, res) => {
  try {
    const getAllDecks = await Deck.find();

    getAllDecks
      ? res.status(200).json({
          message: "All of the decks that have been made.",
          getAllDecks,
        })
      : res.status(404).json({
          message: "No decks have been found/made.",
        });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

//TODO Create an endpoint that creates a new deck of cards
// http://localhost:4040/deck/
router.post("/", validateSession, async (req, res) => {
  try {
    const deck = new Deck({
      category: req.body.category,
      owner_id: req.user._id,
    });

    const newDeck = await deck.save();

    res.status(200).json({
      message: "You have successfully created a new Flashcard Deck!",
      deck: newDeck,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

//TODO Create an endpoint to edit/update a deck
// http://localhost:4040/deck/updatedeck/:deck_id
router.patch("/updatedeck/:deck_id", validateSession, async (req, res) => {
  try {
    const findDeck = await Deck.findOne({
      _id: req.params.deck_id,
    });

    if (!findDeck) throw new Error("Couldn't Find That Deck.");

    //TODO: Add validation to make sure the user is the owner of the deck
    if (req.user._id != findDeck.owner_id)
      throw new Error("You Cannot Edit This Deck!");
    const filter = { _id: req.params.deck_id };
    const info = req.body;
    const returnOption = { new: true };
    const updatedDeck = await Deck.findOneAndUpdate(filter, info, returnOption);
    res.status(200).json({
      message: "Deck was successfully updated!",
      updatedDeck,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

//TODO Create a delete route to delete a deck
// http://localhost:4040/deck/deletedeck/:deck_id
router.delete("/deletedeck/:deck_id", validateSession, async (req, res) => {
  try {
    const findDeck = await Deck.findOne({ _id: req.params.deck_id });
    if (!findDeck) throw new Error("Couldn't Find That Deck.");
    const { deck_id } = req.params;
    const deleteDeck = await Deck.deleteOne({
      _id: deck_id,
    });
    if (deleteDeck.deletedCount) {
      res.status(200).json({
        message: "Deck Successfully Deleted",
        deleteDeck,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
module.exports = router;
