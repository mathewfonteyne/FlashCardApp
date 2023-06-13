import Signup from "./signup/Signup";
import Login from "./login/Login";
import { useState } from "react";
import React from "react";
import { Button } from "reactstrap";
import { Col, Container, Row } from "reactstrap";

export default function Auth(props) {
  // useState to hold button's state login/signup
  const [button, setButton] = useState("Signup");
  // function to switch button from login to signup with setButton
  const swapForm = () => {
    button === "Login" ? setButton("Signup") : setButton("Login");
  };
  
  // function that changes the display, swap the forms 
  // ternary checks if button is set to Login, if true see signup if false see login
  const displayForm = () => {
    return button === "Login" ? (
      <Container>
        <Row>
          <Col md="6">
            <Signup updateToken={props.updateToken} />
          </Col>
        </Row>
      </Container>
    ) : (
      <Container>
        <Row>
          <Col md="6">
            <Login updateToken={props.updateToken} />
          </Col>
        </Row>
      </Container>
    );
  }

    return (
      <>
        <Button onClick={swapForm} color="dark">
          {button}
        </Button>
        {displayForm()}
      </>
    );
  };



