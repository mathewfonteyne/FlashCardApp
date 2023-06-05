// import Signup from './signup/Signup';
import Login from './login/login';

import { Col, Container, Row, Button } from 'reactstrap';
import { useState } from 'react';
import FullButton from '../buttons/FullButton';

export default function Auth(props) {

    const [ button, setButton ] = useState('Signup');

    const swapForm = () => {
        button === "Login" ?
            setButton("Signup") :
            setButton("Login")
    }

    const displayForm = () => {
        return(
            button === "Login" ?
                <Container >
                    <Row>
                        <Col md="6">
                            <Signup
                                updateToken={props.updateToken}
                            />
                        </Col>
                    </Row>
                </Container> :
                <Container>
                    <Row>
                        <Col md="6">
                            <Login
                                updateToken={props.updateToken} 
                            />
                        </Col>
                    </Row>
                </Container>
                
        )
    }


    return (
        <>
            
                <Button onClick={swapForm} color="dark">{button}</Button>
            
            {displayForm()}
        </>
    )
    }
