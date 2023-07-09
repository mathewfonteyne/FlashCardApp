// import React from "react";
// import { Table, Button } from "reactstrap";
// import { useNavigate, useParams } from 'react-router-dom'

// export default function DeleteCard(props) {
    
//     const navigate = useNavigate();
//     const id = useParams();
//     async function deleteCard() {
        
        
//         const url = `http://localhost:4040/flashcard/deletecard/${id}`
//         console.log(id);
//         const myHeaders = new Headers();
//         myHeaders.append("Authorization", props.token);

//         let requestOptions = {
//             headers: myHeaders,
//             method: 'DELETE'
//         }

//         try {
//             let response = await fetch(url, requestOptions);
//             let data = await response.json();
//             if(data) {
//                 props.fetchCard(); //! WTF IS THIS
//             }
//         } catch(err) {
//             console.error(err);
//         }
//     } 
//     // console.log("FOR JEFF", props.currentCard);
//     return (
//         <>
//             <Button
//                 // onClick={() => deleteCard(props.currentCard)}
//                 onClick = {deleteCard}
//                 color="danger">Delete</Button>
//         </>
//     )
// }

// //! this will live in deck page
// //! Include popup
