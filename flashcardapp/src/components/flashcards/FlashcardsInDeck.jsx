import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Col, Row, Container } from "reactstrap";
import EditFlashcard from "./EditFlashcard";
import AddFlashcard from "./AddFlashcard";
import "./FlashcardsInDeck.css";
import indexCard from "./index-cardwork.png";

export default function FlashcardsInDeck(props) {
  const { id } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const fronts = flashcards.map((card) => card.front);
  const backs = flashcards.map((card) => card.back);
  const [cardIndex, setCardIndex] = useState(0);
  const [showFront, setShowFront] = useState(true);
  // const [cardId, setCardId] = useState({});
  // let cardId;
  const url = `http://localhost:4040/flashcard/allflashcards/${id}`;

  const navigate = useNavigate();

  // const getCardId = (id) => {
  //   setCardId(id);
  // };

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
      // setCardId(flashcards[cardIndex]._id);
      // let neededId = data.getAllFlashCards[0]._id;
      // console.log(data.getAllFlashCards);
      // getCardId(neededId);
    } catch (err) {
      console.log(err);
    }
  };

  // let cardId = flashcards[cardIndex];
  const nextCard = () => {
    // getCardId(flashcards[cardIndex]._id);
    setShowFront(true);
    if (cardIndex == flashcards.length - 1) {
      setCardIndex(0);
      // getCardId(flashcards[cardIndex]._id);
      // console.log(flashcards[cardIndex]);
      // console.log(cardIndex);
    } else {
      setCardIndex(cardIndex + 1);
      // getCardId(flashcards[cardIndex]._id);
      // console.log(cardIndex);
      // console.log(flashcards[cardIndex]);
    }
    // getCardId(flashcards[cardIndex]._id);
  };

  const prevCard = () => {
    // getCardId(flashcards[cardIndex]._id);
    setShowFront(true);
    if (cardIndex == 0) {
      setCardIndex(flashcards.length - 1);
      // getCardId(flashcards[cardIndex]._id);
      // console.log(cardIndex);
    } else {
      setCardIndex(cardIndex - 1);
      // getCardId(flashcards[cardIndex]._id);
      // console.log(cardIndex);
    }
    // getCardId(flashcards[cardIndex]._id);
  };

  const flipCard = () => {
    //let tempFront = fronts[cardIndex];
    //let tempBack = backs[cardIndex];
    //if (tempFront === true) {
    //return tempBack;
    //} else {
    //return tempFront;
    //}
    setShowFront((current) => !current);
  };
  // console.log(cardIndex);
  // console.log(cardId);

  const deleteFlashcard = async () => {
    const url = `http://localhost:4040/flashcard/deletecard/${flashcards[cardIndex]._id}`;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);

    let requestOptions = {
      headers: myHeaders,
      method: "DELETE",
    };
    try {
      let response = await fetch(url, requestOptions);
      let data = await response.json();
      // console.log(`${flashcards[cardIndex]._id}`);

      if (data) {
        fetchFlashcards();
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = () => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      deleteFlashcard();
    }
  };
  useEffect(() => {
    if (props.token) {
      fetchFlashcards();
    }
  }, [props.token]);

  // console.log(cardIndex);
  // console.log(flashcards);
  // setCardId(flashcards[cardIndex]._id);
  const style = {
    height: "30em",
    width: "75em",
  };
  return (
    <>
      {/* {flashcards.map((flashcards, index) => (
        
      ))} */}
      <Row>
        <Col md="2">
          <Button
            color="info"
            outline
            onClick={() => {
              navigate("/decks");
            }}
          >
            Back to Decks
          </Button>
        </Col>
      </Row>
      <Container className="card-grid">
        <Card
          // style={style}
          className="card"
          // style={{
          //   height: "16rem",
          //   backgroundColor: "light blue",
          // }}
        >
          <div className="flashcontent">
            {showFront ? fronts[cardIndex] : backs[cardIndex]}
          </div>

          {/* {console.log(cardId)} */}
          <Row className="flashcardbtnrow">
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
          <Row>
            <Col>
              <Button
                onClick={() => {
                  navigate(`/card/edit/${flashcards[cardIndex]._id}`);
                }}
                color="warning"
              >
                Edit Card
              </Button>
            </Col>
            <Col>
              <Button onClick={handleDelete} color="danger">
                Delete Card
              </Button>
            </Col>
          </Row>
        </Card>
      </Container>
      {/* <Button
          onClick={() => {
            navigate("/card/addcard");
          }}
          color="success"
        >
          Add Card
        </Button> */}
      <AddFlashcard
        id={id}
        fetchFlashcards={fetchFlashcards}
        token={props.token}
      />
    </>
  );
}
