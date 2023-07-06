import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'

export default function DeckDelete(props) {
    const { deck_id } = useParams();
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
            console.error(err);
        }
    } 
}

//! this will live in deck page
//! Include popup
