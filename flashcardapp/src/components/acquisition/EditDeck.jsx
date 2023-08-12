import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { Container, Input, Form, FormGroup, Label, Button } from "reactstrap";
export default function EditDeck(props) {
  const { id } = useParams();
  const [decks, setDecks] = useState([]);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const url = `http://localhost:4040/deck/updatedeck/${id}`;

  async function handleSubmit(e) {
    e.preventDefault();

    let bodyObj = JSON.stringify({
      category: category,
    });
    const reqOptions = {
      headers: new Headers({
        Authorization: props.token,
        "Content-Type": "application/json",
      }),
      body: bodyObj,
      method: "PATCH",
    };
    try {
      const res = await fetch(url, reqOptions);
      const data = await res.json();
      if (data.message === "Deck was successfully updated!") {
        alert(`${data.message}`);
      }
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  }
  //   const fetchDecks = async () => {
  //     const url = "http://localhost:4040/deck/";
  //     const requestOptions = {
  //       method: "GET",
  //       headers: new Headers({
  //         Authorization: props.token,
  //       }),
  //     };
  //     try {
  //       const res = await fetch(url, requestOptions);
  //       const data = await res.json();
  //       setDecks(data.getAllDecks);
  //       // console.log(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   // Use useEffect to run the fetch function to check for and maintain our token
  //   useEffect(() => {
  //     if (props.token) {
  //       fetchDecks();
  //     }
  //   }, [props.token]);
  //   console.log(decks);
  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Edit Category</Label>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              autoComplete="off"
              required="true"
            />
          </FormGroup>
          <Button color="success" type="submit">
            Confirm
          </Button>
        </Form>
      </Container>
    </>
  );
}
