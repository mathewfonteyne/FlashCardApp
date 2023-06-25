import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditCard(props) {
    const { id } = useParams();
    const { deck_id } = useParams();
    const [cardFront, setCardFront] = useState("");
    const [cardBack, setCardBack] = useState("");

    const navigate = useNavigate();

    const url = `http://localhost:4040/deck/create/${deck_id}`;

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
            const { front, back, deck } = data.getDeck;

            setCardFront(front);
            setCardBack(back);
            setDeckName(deck);

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
            deck: deckName,
            front: cardFront,
            back: cardBack,
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
            Edit Card
          </h1>
          <Container>
            <Row>
              <Col md="4">
                <FullButton>
                  <Button 
                  color='info' 
                  outline
                  onClick={() => navigate(`/deck`)}>
                  Back to decks</Button>
                </FullButton>
              </Col>
              <Col md="8">
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label>Front</Label>
                    <Input
                      value={cardFront}
                      onChange={(e) => setCardFront(e.target.value)}
                      autoComplete="off"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Front</Label>
                    <Input
                      value={cardBack}
                      onChange={(e) => setCardBack(e.target.value)}
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