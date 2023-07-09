import React from "react";
// import { useState, useEffect, useRef } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import FlashcardsInDeck from "../flashcards/FlashcardsInDeck";

export default function DeckCreate(props) {
  // const [decks, setDecks] = useState([]);
  // const fetchDecks = async () => {
  //   const url = "http://localhost:4040/deck/";
  //   const reqOptions = {
  //     method: "GET",
  //     headers: new Headers({
  //       Authorization: props.token,
  //     }),
  //   };
  //   try {
  //     const res = await fetch(url, reqOptions);
  //     const data = await res.json();
  //     // console.log(data);
  //     setDecks(data.getAllDecks);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {
  //   if (props.token) {
  //     fetchDecks();
  //   }
  // }, [props.token]);
  const navigate = useNavigate();
  const deckRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const category = deckRef.current.value;

    let url = "http://localhost:4040/deck/";

    let bodyObj = JSON.stringify({
      category,
    });

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // setting our content to be passed
    myHeaders.append("Authorization", props.token);
    // token to evaluate.

    const requestOption = {
      headers: myHeaders,
      body: bodyObj,
      method: "POST",
    };
    try {
      const res = await fetch(url, requestOption);
      const data = await res.json();

      // console.log(data);
      // props.fetchDecks();
      navigate("/decks");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <h1>Add Deck</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>
            <b>Deck Category</b>
          </Label>
          <Input innerRef={deckRef} autoComplete="off" type="text" required />
        </FormGroup>
        <Button
          // onClick={() => {
          //   navigate("/decks");
          // }}
          color="info"
        >
          <b>Add Deck</b>
        </Button>
      </Form>
    </>
  );
}
