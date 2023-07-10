import { useRef } from "react";
// Removed the react-strap button
import { Form, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
/* 
npm install @mui/material @emotion/react @emotion/styled
*/
// This was done for M-ui
import * as React from "react";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

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
    <Container sx={{ bgcolor: "tomato", height: "100v" }} component="main">
      {/* {picture that loads on the side} */}
      <Grid container spacing={2} sx={{ height: "80vh", mt: 3 }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 11,
              mx: -1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <FormGroup>
                {/* {<Label for="exampleEmail">Email</Label>} */}
                <TextField
                  innerRef={emailRef}
                  label="Email Address"
                  margin="normal"
                  required
                  fullWidth
                  name="email"
                  id="email"
                  type="email"
                  placeholder="exampleEmail"
                  autoComplete="off"
                />
              </FormGroup>
              <FormGroup>
                {/* <{Label for="examplePassword">Password</Label}> */}
                <TextField
                  innerRef={passwordRef}
                  label="Password"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="off"
                />
              </FormGroup>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, ":hover": { bgcolor: "darkblue" } }}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
