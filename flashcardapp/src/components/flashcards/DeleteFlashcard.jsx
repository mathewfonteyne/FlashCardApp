import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DeleteFlashcard(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const url = `http://localhost:4040/flashcard/deletecard/${id}`;
  console.log(id);
  //   async function deleteCard(id) {}
  return <>DeleteFlashcard</>;
}
