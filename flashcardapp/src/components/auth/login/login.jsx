import { useRef } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

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
        })

        const url = "http://localhost:4040/user/login";

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: body // key and value
            })
            const data = await res.json()

            if (data.message === "Login Successful!") {
                updateToken(data.token); // message matches user.controller.js
                navigate("/flashcard"); //! temp navigate
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    // Standard import from Unit7, day50
    return (
        <>
            <h1> Login </h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input
                        innerRef={emailRef}
                        id="email"
                        type="email"
                        placeholder="exampleEmail"
                        autoComplete="off"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input
                        innerRef={passwordRef}
                        id="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="off"
                    />
                </FormGroup>
                <Button type="submit">Login</Button>
            </Form>
        </>
    );
}
