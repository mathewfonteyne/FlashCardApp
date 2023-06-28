import React from "react";
import { Table, Button } from "reactstrap";
import { useNavigate } from 'react-router-dom'

export default function CardDelete(props) {
    
    const navigate = useNavigate();

    async function deleteCard(id) {

        const url = `http://localhost:4040/flashcard/deletecard/${id}`

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
                props.fetchCard();
            }
        } catch(err) {
            console.error(err);
        }
    } 
}

//! this will live in deck page
//! Include popup
// return (
//     <>
//         <Button
//             onClick={() => deleteCard(card._id)}
//             color="danger">Delete</Button>
//     </>
// )