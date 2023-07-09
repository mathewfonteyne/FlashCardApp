import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Col, Row, Container } from "reactstrap";

export default function AllFlashcards(props) {
  const [flashcards, setFlashcards] = useState([]);
  const fronts = flashcards.map((card) => card.front);
  const backs = flashcards.map((card) => card.back);
  const [cardIndex, setCardIndex] = useState(0);
  const [showFront, setShowFront] = useState(true);
  const url = "http://localhost:4040/flashcard/allflashcards";
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
      console.log(data.getAllFlashCards);
      if (data.getAllFlashCards.length < 1) {
        alert("No flashcards have been made yet!");
      }
      setFlashcards(data.getAllFlashCards);
      console.log(cardIndex);
    } catch (err) {
      console.error(err);
    }
  };
  const nextCard = () => {
    setShowFront(true);
    if (cardIndex == flashcards.length - 1) {
      setCardIndex(0);
    } else {
      setCardIndex(cardIndex + 1);
    }
  };

  const prevCard = () => {
    setShowFront(true);
    if (cardIndex == 0) {
      setCardIndex(flashcards.length - 1);
    } else {
      setCardIndex(cardIndex - 1);
    }
  };

  const flipCard = () => {
    setShowFront((current) => !current);
  };
  useEffect(() => {
    if (props.token) {
      fetchFlashcards();
    }
  }, [props.token]);
  return (
    <>
      <Container>
        <Card>
          {showFront ? fronts[cardIndex] : backs[cardIndex]}
          <Row>
            <Col>
              <Button onClick={prevCard}>back</Button>
            </Col>
            <Col>
              <Button onClick={flipCard}>Flip Card</Button>
            </Col>
            <Col>
              <Button onClick={nextCard}>next</Button>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
}
