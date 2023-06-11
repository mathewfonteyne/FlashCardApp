//importing the tags use by reactstrap
import { FormGroup, Form, Row, Col, Label, Input, Button } from "reactstrap";
// importing useRef
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";

export default function Signup({updateToken}) {
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
        navigate("/flashcards");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

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
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>First Name:</Label>
              <Input innerRef={firstNameRef} autoComplete={"off"} />
            </FormGroup>
            <FormGroup>
              <Label>Last Name:</Label>
              <Input innerRef={lastNameRef} autoComplete={"off"} />
            </FormGroup>
            <FormGroup>
              <Label>Email:</Label>
              <Input innerRef={emailRef} type="email" autoComplete={"off"} />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                innerRef={passwordRef}
                type="password"
                autoComplete={"off"}
              />
            </FormGroup>
            <Button>
              <Button type="submit">Signup</Button>
            </Button>
          </Form>
        </CardBody>
      </Card>
    </>
  );
}

//! previously resided in auth.jsx, moved here and modified to class style. Sorry Rich.
// return (
//   <>
//     <Card
//       style={{
//         width: "18rem",
//         margin: "center",
//       }}
//     >
//       <img alt="Sample" src="https://picsum.photos/300/200" />
//       <CardBody>
//         <CardTitle tag="h5"></CardTitle>
//         <CardSubtitle className="mb-2 text-muted" tag="h6">
//           <Signup updateToken={props.updateToken} />
//         </CardSubtitle>
//         <CardText>
//           Some quick example text to build on the card title and make up the
//           bulk of the card‘s content.
//         </CardText>
//         <Button>Button</Button>
//       </CardBody>
//     </Card>
//   </>
// );
