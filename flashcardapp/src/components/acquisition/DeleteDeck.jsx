
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";
import { useState, useEffect } from "react";

export default function DeckDelete(props) {
    const { deck_id } = useParams();
    const navigate = useNavigate();
    const [decks, setDecks] = useState([]);
    const url = `http://localhost:4040/deletedeck/${deck_id}`;

    const fetchDecks = async () => {
        const reqOptions = {
            method: "GET",
            headers: new Headers({
                Authorization: props.token,
            }),
        };

        try {
            const response = await fetch(url, reqOptions);
            const data = await response.json();
            if (data.getAllDecks.length < 1) {
                alert("No decks!");
            }
            console.log(data);
            setDecks(data.getAllDecks);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteDeck = async () => {
        const url = `http://localhost:4040/deletedeck/${deck_id}`;


        const myHeaders = new Headers();
        myHeaders.append("Authorization", props.token);

        let requestOptions = {
            headers: myHeaders,
            method: "DELETE",
        };

        try {
            let response = await fetch(url, requestOptions);
            let data = await response.json();

            if (data) {
                fetchDecks();
            }
        } catch (err) {
            console.error(err);
        }
    }
    const handleDelete = () => {
        const confirmed = window.confirm("Are you sure you want to delete?");
        if (confirmed) {
            deleteDeck();
        }
    };
    useEffect(() => {
        if (props.token) {
            fetchDecks();
        }
    }, [props.token]);

    return (
        <>
            <Row>
                <Col md="2">
                    <Button
                        color="info"
                        outline
                        onClick={() => {
                            navigate("/decks");
                        }}
                    >
                        Back to Decks
                    </Button>
                </Col>
            </Row>
                    <Row>
                        <Col>
                            <Button onClick={handleDelete} color="danger">
                                Delete Deck
                            </Button>
                        </Col>
                    </Row>
                <Row>
                    <Col>
                        <deleteDeck decks={decks} />
                    </Col>
                </Row>
        </>
    );


