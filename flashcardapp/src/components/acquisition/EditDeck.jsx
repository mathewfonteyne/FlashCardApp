import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditDeck(props) {
    const { deck_id } = useParams();
    const [deckCategory, setDeckCategory] = useState("");

    const navigate = useNavigate();

    const url = `http://localhost:4040/deck/updatedeck/${deck_id}`;

    const fetchDeck = async () => {
        const requestOption = {
            method: "GET",
            headers: new Headers({
                Authorization: props.token,
            }),
        };
        try {
            const res = await fetch(url, requestOption);
            const data = await res.json();
            const { category } = data.getDeck;

            setDeckCategory(category);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (props.token) {
            fetchDeck();
        }
    }, [props.token]);

    async function handleSubmit(e) {
        e.preventDefault();

        let bodyOjb = JSON.stringify({
            category: deckCategory,
        });

        const requestOption = {
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
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }
            return (
                <>
                    <h1 style={{ textAlign: "center", textDecoration: "underline" }}>
                        Edit Deck
                    </h1>
                    <Container>
                        <Row>
                            <Col md="8">
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Label>Category</Label>
                                        <Input
                                            value={deckCategory}
                                            onChange={(e) => setDeckCategory(e.target.value)}
                                            autoComplete="off"
                                        />
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </>
            );
        }

