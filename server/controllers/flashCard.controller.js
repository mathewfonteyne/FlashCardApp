const router = require("express").Router();

const FlashCard = require("../models/flashCard.model");
const Deck = require("../models/deck.model");
const User = require("../models/user.model");
// Adding in the validateSession function
const validateSession = require("../middleware/validate-session");

//TODO Create a endpoint that gets all flashcards made
// http://localhost:4040/flashcard/allflashcards
router.get("/allflashcards", validateSession, async (req, res) => {
  try {
    const getAllFlashCards = await FlashCard.find();
    getAllFlashCards
      ? res.status(200).json({
          message: "All of the flashcards that have been made.",
          getAllFlashCards,
        })
      : res.status(404).json({
          message: "No flashcards have been found/made.",
        });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

//TODO Display all flash cards within a deck
// http://localhost:4040/flashcard/allflashcards/:deck_id
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
    let deckName = findDeck.category;

    const flashCard = new FlashCard({
      front: req.body.front,
      back: req.body.back,
      deck: deckName, // req.params.deck_id,
      owner_id: req.user._id,
    });
    // console.log(deckName);

    const newFlashCard = await flashCard.save();
    res.status(200).json({
      message: "New Flashcard Added!",
      newFlashCard,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

//TODO Create an endpoint to update/patch a flashcard
// http://localhost:4040/flashcard/updateflashcard/:id
router.patch("/updateflashcard/:id", validateSession, async (req, res) => {
  try {
    const getFlashCard = await FlashCard.findOne({
      _id: req.params.id,
      // owner_id: req.user._id,
    });

    // const flashCardOwner = await FlashCard.findOne({
    //   owner_id: req.user._id,
    // });

    if (!getFlashCard) throw new Error("No Flashcard Found!");
    if (req.user._id != getFlashCard.owner_id)
      throw new Error("You Cannot Edit This Card!");
    // console.log(getFlashCard.owner_id);
    // console.log(req.user._id);

    const filter = { _id: req.params.id, owner_id: req.user._id };
    const info = req.body;
    const returnOption = { new: true };
    const update = await FlashCard.findOneAndUpdate(filter, info, returnOption);
    // console.log(update);

    res.status(200).json({
      message: "Successfully Updated!",
      update,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

//TODO Create an endpoint to delete a flashcard
// http://localhost:4040/flashcard/deletecard/:id
router.delete("/deletecard/:id", validateSession, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFlashCard = await FlashCard.deleteOne({
      _id: id,
      owner_id: req.user._id,
    });
    deletedFlashCard.deletedCount
      ? res.status(200).json({
          message: "Successfully Deleted!",
          deletedFlashCard,
        })
      : res.status(404).json({
          message: "No Flashcard in your deck was found!",
        });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;
