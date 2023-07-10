import React from "react";
// decks begin use as a test
//import Decks from "./Decks";
import Decks from "./Decks";
import DeckCreate from "./DeckCreate";
import { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
//import { useNavigate } from "react-router-dom";

export default function Acquisition(props) {
  // State to house movie data
  const [decks, setDecks] = useState([]);

  const fetchDecks = async () => {
    const url = "http://localhost:4040/deck/";
    const requestOptions = {
      method: "GET",
      headers: new Headers({
        Authorization: props.token,
      }),
    };
    try {
      const res = await fetch(url, requestOptions);
      const data = await res.json();
      setDecks(data.getAllDecks);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Use useEffect to run the fetch function to check for and maintain our token
  useEffect(() => {
    if (props.token) {
      fetchDecks();
    }
  }, [props.token]);

  return (
    <>
      <Container>
        <Row>{/* <DeckCreate /> */}</Row>
        <Row>
          {/* <Col md="10"> */}
          <Decks decks={decks} token={props.token} fetchDecks={fetchDecks} />
          {/* </Col> */}
          {/* <Col md="2"> */}
          {/* <DeckCreate /> */}
          {/* </Col> */}
        </Row>
      </Container>
    </>
  );
}
