import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Col,
  Container,
  Input,
  Row,
  Form,
  FormGroup,
  Label,
  Button,
} from "reactstrap";

export default function EditFlashcard(props) {
  const { id } = useParams();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const navigate = useNavigate();
  const url = `http://localhost:4040/flashcard/updateflashcard/${id}`;

  async function handleSubmit(e) {
    e.preventDefault();

    let bodyObj = JSON.stringify({
      front: front,
      back: back,
    });
    const requestOptions = {
      headers: new Headers({
        Authorization: props.token,
        "Content-Type": "application/json",
      }),
      body: bodyObj,
      method: "PATCH",
    };
    try {
      const res = await fetch(url, requestOptions);
      const data = await res.json();
      if (data.message === "Successfully Updated!") {
        alert(`${data.message}`);
      }
      navigate(-1);
      //   console.log(data);
      // Use navigate on the button to back to the table view
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Front of the Flashcard</Label>
            <Input
              value={front}
              onChange={(e) => setFront(e.target.value)}
              autoComplete="off"
              required="true"
            />
          </FormGroup>
          <FormGroup>
            <Label>Back of Flashcard</Label>
            <Input
              value={back}
              onChange={(e) => setBack(e.target.value)}
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
