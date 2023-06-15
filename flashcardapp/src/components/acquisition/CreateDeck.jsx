import React, { useRef } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";

export default function CreateDeck(props) {
    // Use useRef to get values from inputs!
    const categoryRef = useRef(); // map to deck name

    // Build our handleSubmit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(categoryRef.current.value);

        // Create vars for our input values
        const category = categoryRef.current.value;

        // our URL, subject to change
        const url = "http://localhost:4040/decks/create";

        // Construct the body object & JSON stringify it
        let bodyObj = JSON.stringify({
            category,
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
            <h1>Add Deck</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Category</Label>
                    <Input innerRef={categoryRef} autoComplete="off" type="text" required />
                </FormGroup>
                <Button>
                    <Button color="success">Add Deck</Button>
                </Button>
            </Form>
        </>
    );
}
