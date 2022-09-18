import { useState, useEffect } from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import axios from "axios"


const PlayerAttemptions = () =>{
    
    
    const BACKEND_URL = "http://127.0.0.1:8000"
    const [attemptsCount, setAttemptsCount] = useState()
    const [switchBtnCount, setSwitchBtnCount] = useState()
    const [validated, setValidated] = useState(false);
    


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        setValidated(true);
    };

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/match/`)
        .then((response)=>{
            setAttemptsCount(response.data['match_settings'].games_count)
            setSwitchBtnCount(response.data['match_settings'].try_count)
        })
        .catch(function(error) {
            console.log(error);
        });
    })

    return(
        <Container>
            <div className='switch-btn-wrapper'>
                {(() => {
                    const switchBtn = [];
                    for (let i = 1; i <= 10; i++) {
                        switchBtn.push(
                            <button key={i} className="switch-btn">{i}</button>
                        );
                    }
                    return switchBtn;
                })()}
            </div>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="add-attempts-form mt-5 attempts-form">
                {(() => {
                    const attemptsToAdd = [];
                    for (let i = 1; i <= attemptsCount; i++) {
                        attemptsToAdd.push(
                            <Form.Group className="mb-3" controlId="attempts" key = {i} >
                                <Form.Label>attempt{i}</Form.Label>
                                <Form.Control type="number"required />
                            </Form.Group>
                        );
                    }
                    return attemptsToAdd;
                })()}

                <Button variant="outline-primary" type="submit" className='done-btn px-4 ms-4 mb-5'>
                    Done
                </Button>
            </Form>
        </Container>
    )

}
export default PlayerAttemptions