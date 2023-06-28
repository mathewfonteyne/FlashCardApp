import { useRef } from "react";
// removed Button to used M-ui button
import { Form, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
// importing M-ui into the project
import * as React from "react";
import Button from "@mui/material/Button";

import Avatar from "@mui/material/Avatar";

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

export default function Login({ updateToken }) {
  // Refs
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  //! Style 1
  // const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     // Request body
  //     let body = JSON.stringify({
  //         email: emailRef.current.value,
  //         password: passwordRef.current.value,
  //     });
  //     // Pulled /login from user.controller.js
  //     const url = "http://localhost:4040/user/login";

  //     try {
  //         const res = await fetch(url, {
  //             method: "POST",
  //             headers: new Headers({
  //                 "Content-Type": "application/json",
  //             }),
  //             body: body, // key and value
  //         });
  //         const data = await res.json();
  //         console.log(data);
  //     } catch (err) {
  //         console.log(err);
  //     }
  // };
  const defaultTheme = createTheme();
  //! Style 2
  async function handleSubmit(e) {
    e.preventDefault();
    let body = JSON.stringify({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    const url = "http://localhost:4040/user/login";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: body, // key and value
      });
      const data = await res.json();

      if (data.message === "Login Successful!") {
        updateToken(data.token); // message matches user.controller.js
        navigate("/decks");
        // alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Standard import from Unit7, day50
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
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
            Log in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              innerRef={emailRef}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              innerRef={passwordRef}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
