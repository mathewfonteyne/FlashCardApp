//importing the tags use by reactstrap
import { FormGroup, Form, Row, Col, Label, Input, Button } from "reactstrap";
// importing useRef
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup({ updateToken }) {
  // variables use for containing the useRef() method/functionality
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  // handleSubmit function use to do the CRUD method to signup
  async function handleSubmit(e) {
    // Stop the page from refreshing when the from submits
    e.preventDefault();

    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    let body = JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    });

    // packaging the url for the database
    const url = "http://localhost:4040/user/signup";

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      headers,
      body: body,
      method: "POST",
    };
    // postman alternative but written in react method/raw json
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      if (data.message === "Success! User Created!") {
        updateToken(data.token);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <>
      <h2>Signup</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="row-cols-lg-auto g-3 align-items-center">
          <Col>
            <Label className="visually-hidden" for="exampleEmail">
              Firstname
            </Label>
            <Input
              innerRef={firstNameRef}
              autoComplete={"off"}
              name="firstname"
              placeholder="Your first name"
              type="text"
            />
          </Col>
          <Col>
            <Label className="visually-hidden" for="exampleEmail">
              Lastname
            </Label>
            <Input
              innerRef={lastNameRef}
              autoComplete={"off"}
              name="lastname"
              placeholder="Your last name"
              type="text"
            />
          </Col>
          <Col>
            <Label className="visually-hidden" for="exampleEmail">
              Email
            </Label>
            <Input
              innerRef={emailRef}
              autoComplete={"off"}
              name="email"
              placeholder="letslearn@email.com"
              type="email"
            />
          </Col>
          <Col>
            <Label className="visually-hidden" for="examplePassword">
              Password
            </Label>
            <Input
              innerRef={passwordRef}
              autoComplete={"off"}
              name="password"
              placeholder="secret"
              type="password"
            />
          </Col>

          <Col>
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
