import React from 'react';
import { useNavigate } from 'react-router-dom'

export default function DeckDelete(props) {
    
    const navigate = useNavigate();

    async function deleteDeck(id) {
        
        const url = `http://localhost:4040/deletedeck/${deck_id}`

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

//! this will live in deck page
//! Include popup
return (
    <>
        <Button
            onClick={() => deleteDeck(deck._id)}
            // onclick navigate back to /decks 
            color="danger">Delete</Button>
    </>
)