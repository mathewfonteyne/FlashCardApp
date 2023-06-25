import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Col, Row } from "reactstrap";

export default function FlashcardsInDeck(props) {
  const { id } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const fronts = flashcards.map((card) => card.front);
  const backs = flashcards.map((card) => card.back);
  const [cardIndex, setCardIndex] = useState(0);
  const url = `http://localhost:4040/flashcard/allflashcards/${id}`;
  const navigate = useNavigate();

  const fetchFlashcards = async () => {
    const reqOptions = {
      method: "GET",
      headers: new Headers({
        Authorization: props.token,
      }),
    };

    try {
      const response = await fetch(url, reqOptions);
      const data = await response.json();
      if (data.getAllFlashCards.length < 1) {
        alert("No flash cards in this deck yet");
      }
      // console.log(data);
      setFlashcards(data.getAllFlashCards);
    } catch (err) {
      console.log(err);
    }
  };

  const nextCard = () => {
    if (cardIndex == flashcards.length - 1) {
      setCardIndex(0);
    } else {
      setCardIndex(cardIndex + 1);
    }
  };

  const prevCard = () => {
    if (cardIndex == 0) {
      setCardIndex(flashcards.length - 1);
    } else {
      setCardIndex(cardIndex - 1);
    }
  };

  // const flipCard = () => {
  //   let tempFront = fronts[cardIndex]
  //   let tempBack = backs[cardIndex]
  //   if
  // };

  useEffect(() => {
    if (props.token) {
      fetchFlashcards();
    }
  }, [props.token]);
  // console.log(cardIndex);
  // console.log(flashcards);
  return (
    <>
      {/* {flashcards.map((flashcards, index) => (
        
      ))} */}

      <Card
        style={{
          height: "16rem",
          backgroundColor: "light blue",
        }}
      >
        {backs[cardIndex]}
        <Row>
          <Col>
            <Button onClick={prevCard}>back</Button>
          </Col>
          <Col>
            <Button>Flip Card</Button>
          </Col>
          <Col>
            <Button onClick={nextCard}>next</Button>
          </Col>
        </Row>
      </Card>
    </>
  );
}
