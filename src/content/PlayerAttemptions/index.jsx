import { useState, useEffect } from 'react';
import {Container, Form, Button} from 'react-bootstrap';



const PlayerAttemptions = () =>{
   
    const [counter, setCounter] = useState(1)
    const [validated, setValidated] = useState(false);
    const [players, setPlayers] = useState([]);
    const attemptForms = [
        {   
            attempt: `attempt${counter}`,
        }
       
    ]
    const [attemptsToAdd, setAttemptsToAdd ] = useState(attemptForms);
    const handelAddAttempt = (e) =>{
        e.preventDefault();
        setCounter(counter + 1)
        setAttemptsToAdd((prevItems) => [...prevItems, { attempt: `attempt${counter + 1}`}]); 
       
    }   

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
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="add-attempts-form mt-5 attempts-form">
                {attemptsToAdd.map((attempts)=>(
                    <Form.Group className="mb-3" controlId="attempts" key = {attempts.attempt} >
                        <Form.Label>{attempts.attempt}</Form.Label>
                        <Form.Control type="number"required />
                    </Form.Group>
                ))}
              
                <Button variant="success" type="submit" className='px-4' onClick={handelAddAttempt}>
                    Add attempts
                </Button>
                <Button variant="outline-primary" type="submit" className='done-btn px-4 ms-4'>
                    Done
                </Button>
            </Form>
        </Container>
    )

}
export default PlayerAttemptions