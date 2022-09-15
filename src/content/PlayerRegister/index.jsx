import { useState } from "react";
import { useEffect } from "react";
import axios from "axios"
import Container from "react-bootstrap/esm/Container"
import {Table, Form, Button} from 'react-bootstrap';


const playerList = [
    {
        listIndex: 1,
        uid: 85358,
        startTime: '17:40',
        attempts: '0/6',
    },
    {
        listIndex: 2,
        uid: 75894,
        startTime: '17:40',
        attempts: '0/6',
    },
    {
        listIndex: 3,
        uid: 85236,
        startTime: '17:40',
        attempts: '0/6',
    },
    {
        listIndex: 4,
        uid: 25785,
        startTime: '17:40',
        attempts: '0/6',
    },

]

const BACKEND_URL = 0

const PlayerRegister = () =>{
    const [validated, setValidated] = useState(false);
    const [players, setPlayers] = useState([]);


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }

        setValidated(true);
    };

    // useEffect(()=>{
    //     axios.get(`${BACKEND_URL}`).then((response)=>{
    //         setPlayers(response.data)
    //     })
    // },[])
    return(
        <Container>
            <h1 className="match-title text-center mt-5 mb-4 fw-bold">Match: #0085 | Players: 4 </h1>
            <Table striped bordered hover className="text-center mx-auto fs-5">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Player ID</th>
                        <th>Start time</th>
                        <th>attempts</th>
                    </tr>
                </thead>
                <tbody>
                    {playerList.map((data)=>(
                        <tr key={data.listIndex}>
                            <td>{data.listIndex}</td>
                            <td>{data.uid}</td>
                            <td>{data.startTime}</td>
                            <td>{data.attempts}</td>
                        </tr>
                    ))}

                    
                </tbody>
            </Table>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="add-player-form mt-5 d-flex justify-content-center">
                <Form.Group className="mb-3" controlId="player">
                    <Form.Control type="player" placeholder="Enter username" required/>
                </Form.Group>
                <Button variant="outline-primary" type="submit" className='add-player-btn px-4 ms-2'>
                    Add player
                </Button>
            </Form>

        </Container>
        
    )
}
export default PlayerRegister