import React from "react";
import { useRef } from "react";
// import { useParams } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";

export default function AddFlashcard(props) {
  //   const { id } = useParams();
  const frontRef = useRef(); // map to deck name
  const backRef = useRef();

  //   const deckRef = useRef();
  // Build our handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create vars for our input values
    const front = frontRef.current.value;
    const back = backRef.current.value;

    // our URL, subject to change
    const url = `http://localhost:4040/flashcard/create/${props.id}`;

    // Construct the body object & JSON stringify it
    let bodyObj = JSON.stringify({
      front,
      back,
      //   deck,
    });
    // Headers
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // setting our content to be passed
    myHeaders.append("Authorization", props.token);
    // token to evaluate.

    // Request Options object
    const requestOption = {
      headers: myHeaders,
      body: bodyObj,
      method: "POST",
    }; // packaging up all our options in an object

    // Build the try/catch with our fetch
    try {
      const res = await fetch(url, requestOption);
      const data = await res.json();

      // Call the CreateDeck function via props to refresh our table after movie is added
      //   console.log(data);
      props.fetchFlashcards();
      alert("Card successfully added!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {console.log()}
      <h1>Add Card</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Front</Label>
          <Input innerRef={frontRef} autoComplete="off" type="text" required />
        </FormGroup>
        <FormGroup>
          <Label>Back</Label>
          <Input innerRef={backRef} autoComplete="off" type="text" required />
        </FormGroup>
        <Button>
          <Button color="success" type="submit">
            Add Card
          </Button>
        </Button>
      </Form>
    </>
  );
}
