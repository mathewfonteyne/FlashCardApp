import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CardGroup,
  Card,
  CardBody,
  CardTitle,
  Button,
  Table,
} from "reactstrap";
import "./Decks.css";
import deckpicture from "./square.png";

export default function Decks(props) {
  const navigate = useNavigate();
  return (
    <>
      <h1 class="decksheading">Decks</h1>
      {/* <CardGroup>
        <Card>
          {props.decks.map((decks) => (
            key={decks._id}
            {decks.category}
          ))}
        </Card>
      </CardGroup> */}

      {props.decks.map((decks) => (
        <Card
          className="dedecks"
          // scope="row"
          style={{
            width: "16rem",
            // height: "18rem",
            margin: "1rem",

            // textAlign: "center",
          }}
        >
          <img className="imagemove" alt="Sample" src={deckpicture} />
          {/* {decks.category} */}
          <Button
            onClick={() => navigate(`/decks/${decks._id}`)}
            style={{
              margin: ".5rem",
            }}
          >
            {`Study ${decks.category}`}
          </Button>
        </Card>
      ))}
    </>
  );
}
