import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditDeck(props) {
    const { deck_id } = useParams();
    const [deckCategory, setDeckCategory] = useState("");

    const navigate = useNavigate();
    const url = `http://localhost:4040/deck/updatedeck/${deck_id}`;

    async function handleSubmit(e) {
        e.preventDefault();
        let bodyObj = JSON.stringify({
            category: category
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


        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>Category</Label>
                        <Input
                            value={deckCategory}
                            onChange={(e) => setDeckCategory(e.target.value)}
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
