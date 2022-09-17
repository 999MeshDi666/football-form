import { useState, useEffect } from 'react';
import {Container, Form, Button} from 'react-bootstrap';



const PlayerAttemptions = () =>{
   
    const [attemptsID, setAttemptsID] = useState(1)
    const [switchBtnID, setSwitchBtnID] = useState(1)
    const [switchBtn, setSwitchBtn] = useState([])
    const [validated, setValidated] = useState(false);
    const [players, setPlayers] = useState([]);
    
    const attemptInputs = [{attempt: `attempt${attemptsID}`}]
    

    const [attemptsToAdd, setAttemptsToAdd ] = useState(attemptInputs);
    const handelAddAttempt = (e) =>{
        e.preventDefault();
        setAttemptsID(attemptsID + 1)
        setAttemptsToAdd((prevItems) => [...prevItems, { attempt: `attempt${attemptsID + 1}`}]); 
    }   

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        setValidated(true);
    };

    useEffect(() => {
        const createBtm = switchBtnID < 5 && setInterval(() => setSwitchBtnID(switchBtnID + 1), 100);
        setSwitchBtn((prevItems) => [...prevItems, { btnID: switchBtnID }]); 

        return () => clearInterval(createBtm);
    }, [switchBtnID]);

    return(
        <Container>
            <div className='switch-btn-wrapper'>
                {switchBtn.map((id)=>(
                    <button key={id.btnID} className="switch-btn">{id.btnID}</button>
                ))}
            </div>
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