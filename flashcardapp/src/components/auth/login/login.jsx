import { useRef } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
export default function Login({ updateToken }) {
    
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    
    // base of handleSubmit
    async function handleSubmit(e) {
        e.preventDefault();
        let body = JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value,
        })

        const url = "http://localhost:4004/user/login";
        //! temp url, will need to be revisited

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: body
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
    return (
        <>
            <h2> Login </h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input
                        innerRef={emailRef}
                        type="email"
                        autoComplete="off"
                        id="exampleEmail"
                        name="email"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input
                        innerRef={passwordRef}
                        id="examplePassword"
                        name="password"
                        placeholder="Password"
                        type="password"
                        autoComplete="off"
                    />
                </FormGroup>
                <Button type='submit'>Login</Button>
            </Form>
        </>
    );
}
