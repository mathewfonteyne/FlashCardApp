import "./App.css";
import Acquisition from "./components/acquisition/Acquisition";
import FlashcardsInDeck from "./components/flashcards/FlashcardsInDeck";
import Auth from "./components/auth/Auth";
import { Routes, Route } from "react-router-dom";
import CreateDeck from "./components/acquisition/CreateDeck";
import Logout from "./components/auth/logout/Logout";
import { useEffect, useState } from "react";
import CreateCard from "./components/acquisition/CreateCard";
import DeckDelete from "./components/acquisition/DeleteDeck";
import CardDelete from "./components/acquisition/DeleteCard";
import EditCard from "./components/acquisition/EditCard";
import EditDeck from "./components/acquisition/EditDeck";

function App() {
  // Use useState to house token
  const [sessionToken, setSessionToken] = useState("");

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <div className="App">
      {sessionToken !== "" ? <Logout setToken={setSessionToken} /> : null}
      <Routes>
        <Route path="/" element={<Auth updateToken={updateToken} />} />
        <Route path="/decks" element={<Acquisition token={sessionToken} />} />
        <Route path="/decks/create" element={<CreateDeck token={sessionToken} />} />
        <Route path="/cards/create" element={<CreateCard token={sessionToken} />} />
        <Route path="/deck/deletedeck" element={<DeckDelete token={sessionToken} />} />
        <Route path="/flashcard/deletecard" element={<CardDelete token={sessionToken} />} />
        <Route path="/flashcard/updateflashcard" element={<EditCard token={sessionToken} />} />
        <Route path="/deck/updatedeck" element={<EditDeck token={sessionToken} />} />
        <Route path="/decks/:id" element={<FlashcardsInDeck token={sessionToken} />} />
      </Routes>
    </div>
  );
}

export default App;
