import { useState } from 'react';
import {Container, Form, Button} from 'react-bootstrap';




const LoginForm = () =>{

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };
    return(
        <Container>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="login-form">
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username"  required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"  required/>
                </Form.Group>
                <Button variant="outline-primary" type="submit" className='px-4'>
                    Login
                </Button>
            </Form>
        </Container>
        
    )
}
export default LoginForm