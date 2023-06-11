import "./App.css";
import Acquisition from "./components/acquisition/Acquisition";
import Auth from "./components/auth/Auth";
import { Routes, Route } from "react-router-dom";

import { useEffect, useState } from "react";

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
      <Routes>
        <Route path="/" element={<Auth updateToken={updateToken} />} />
        <Route
          path="/flashcards"
          element={<Acquisition token={sessionToken} />}
        />
      </Routes>
    </div>
  );
}

export default App;
