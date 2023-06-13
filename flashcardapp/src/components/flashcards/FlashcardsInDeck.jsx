import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function FlashcardsInDeck(props) {
  const { id } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const url = `http://localhost:4040/flashcard/allflashcards/${id}`;
  const navigate = useNavigate();

  const fetchFlashcards = async () => {
    const reqOptions = {
      method: "GET",
      headers: new Headers({
        Authorization: props.token,
      }),
    };

    try {
      const response = await fetch(url, reqOptions);
      const data = await response.json();
      console.log(data.getAllFlashCards);
      setFlashcards(data.getAllFlashCards);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (props.token) {
      fetchFlashcards();
    }
  });
  return <></>;
}
