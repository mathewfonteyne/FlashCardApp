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

export default function Decks(props) {
  const navigate = useNavigate();
  return (
    <>
      <h2>Decks</h2>
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
          // scope="row"
          style={{
            width: "16rem",
            // height: "18rem",
            margin: "1rem",
            // textAlign: "center",
          }}
        >
          <img
            alt="Sample"
            src="https://m.media-amazon.com/images/I/41BqtXRSiXL._AC_.jpg"
          />
          {/* {decks.category} */}
          <Button
            onClick={() => navigate(`/decks/${decks._id}`)}
            style={{
              margin: ".5rem",
            }}
          >
            {`Study ${decks.category}`}
          </Button>
          <Button
          color="warning"
          size="sm"
          >Edit</Button>
          <Button
          color="danger"
          size="sm">Delete</Button>
        </Card>
      ))}
    </>
  );
}
