//importing the tags use by reactstrap
// removed Button for M-ui Sake
import { FormGroup, Form, Row, Col, Label, Input } from "reactstrap";
// importing useRef
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";
//using M-ui for signup page "https://github.com/mui/material-ui/blob/v5.13.6/docs/data/material/getting-started/templates/sign-up/SignUp.js"
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//using M-ui for background color

export default function Signup({ updateToken }) {
  // variables use for containing the useRef() method/functionality
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  //Material UI
  const defaultTheme = createTheme();

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
      <img alt="Sample" src="https://picsum.photos/300/200" />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs" onSubmit={handleSubmit}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    innerRef={firstNameRef}
                    autoComplete={"off"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    innerRef={lastNameRef}
                    autoComplete={"off"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    innerRef={emailRef}
                    type="email"
                    autoComplete={"off"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    innerRef={passwordRef}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title=">8 characters, one upper, and number"
                    placeholder="Greater than 8 characters, at least one number, uppercase, lowercase, and symbol "
                    autoComplete={"off"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
