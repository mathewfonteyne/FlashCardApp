import React, { useRef } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";

export default function CreateDeck(props) {
    // Use useRef to get values from inputs!
    const frontRef = useRef(); // map to deck name
    const backRef = useRef();
    const deckRef = useRef();

    // Build our handleSubmit function
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create vars for our input values
        const front = frontRef.current.value;
        const back = backRef.current.value;
        const deck = deckRef.current.value;

        // our URL, subject to change
        const url = "http://localhost:4040/cards/create";

        // Construct the body object & JSON stringify it
        let bodyObj = JSON.stringify({
            front,
            back,
            deck
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
            props.FetchDecks();
        } catch (err) {
            console.error(err);
        }
    };

    // Build out the form
    return (
        <>
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
                    <Button color="success">Add Card</Button>
                </Button>
            </Form>
        </>
    );
}
