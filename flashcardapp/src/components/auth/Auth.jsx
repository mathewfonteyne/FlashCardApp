import Signup from "./signup/Signup";
import Login from "./login/Login";
import { useState } from 'react';
import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";

// const [ button, setButton ] = useState('Signup');

// const swapForm = () => {
//     button === "Login" ?
//         setButton("Signup") :
//         setButton("Login")
// }

export default function Auth(props) {
  return (
    <>
      <Card
        style={{
          width: "18rem",
          margin: "center",
        }}
      >
        <img alt="Sample" src="https://picsum.photos/300/200" />
        <CardBody>
          <CardTitle tag="h5"></CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            <Signup updateToken={props.updateToken} />
          </CardSubtitle>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card‘s content.
          </CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </>
  );
}

// return (
//     <>
        
//             <Button onClick={swapForm} color="dark">{button}</Button>
        
//         {displayForm()}
//     </>
// )
