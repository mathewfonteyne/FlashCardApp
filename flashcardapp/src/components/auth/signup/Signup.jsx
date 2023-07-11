//importing the tags use by reactstrap
// Removing some reactstrap imports Button
import { FormGroup, Form, Row, Col, Label, Input } from "reactstrap";
// importing useRef

import { useRef, useState } from "react";
import { Box, Container, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";
// This was done for M-ui
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Signup({ updateToken }) {
  // variables use for containing the useRef() method/functionality
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  //M-ui
  const defaultTheme = createTheme();
  const navigate = useNavigate();

  // handleSubmit function use to do the CRUD method to signup
  async function handleSubmit(e) {
    // Stop the page from refreshing when the from submits
    e.preventDefault();

    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // This is where password checks would live

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
        navigate("/decks");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <img alt="Sample" src="https://picsum.photos/300/200" /> */}

          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box onSubmit={handleSubmit} sx={{ mt: 10 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {/* <Label>First Name:</Label> */}
                <TextField
                  inputRef={firstNameRef}
                  name="firstName"
                  required
                  fullWidth
                  label="First Name"
                  id="firstName"
                  autoComplete={"off"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* <Label>Last Name:</Label> */}
                <TextField
                  inputRef={lastNameRef}
                  name="lastName"
                  required
                  fullWidth
                  label="Last Name"
                  autoComplete={"off"}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <Label>Email:</Label> */}
                <TextField
                  inputRef={emailRef}
                  name="email"
                  required
                  fullWidth
                  label="Email"
                  type="email"
                  autoComplete={"off"}
                />
              </Grid>
              <Grid item xs={12}>
                {/* {<Label>Password</Label>}  */}
                <TextField
                  inputRef={passwordRef}
                  required
                  fullWidth
                  name="password"
                  id="password"
                  label="Password"
                  type="password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title=">8 characters, one upper, and number"
                  placeholder="Greater than 8 characters, at least one number, uppercase, lowercase, and symbol "
                  autoComplete={"off"}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, ":hover": { bgcolor: "green" } }}
            >
              Signup
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
