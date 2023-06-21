import React from "react";
import { Table, Button } from "reactstrap";
import { useNavigate } from 'react-router-dom'

export default function DeckTable(props) {
    
    const navigate = useNavigate();

    async function deleteDeck(id) {

        const url = ''

        const myHeaders = new Headers();
        myHeaders.append("Authorization", props.token);

        let requestOptions = {
            headers: myHeaders,
            method: 'DELETE'
        }

        try {
            let response = await fetch(url, requestOptions);
            let data = await response.json();
            if(data) {
                props.fetchDecks();
            }
        } catch(err) {
            console.error(error);
        }
    } 
}

return (
    <>
        <Button
            onClick={() => deleteDeck(deck._id)}
            color="danger">Delete</Button>
    </>
)