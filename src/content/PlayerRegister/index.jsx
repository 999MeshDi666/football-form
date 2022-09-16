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

const BACKEND_URL = "http://10.0.80.107:8000/get_player/string"

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

    useEffect(()=>{
        axios.get(`${BACKEND_URL}`).then((response)=>{
            setPlayers(response.data)
        })
        console.log(`player data:`, players)
    },[])

    return(
        <Container>
            <h1 className="match-title text-center mt-5 mb-4 fw-bold">Match: #0085 | Players: 4 </h1>
            <div className="table-wrapper">
                <Table striped bordered hover className="text-center mx-auto player-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Player ID</th>
                            <th>Start time</th>
                            <th>Attempts</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playerList.map((data)=>(
                            <tr key={data.listIndex}>
                                <td>{data.listIndex}</td>
                                <td>{data.uid}</td>
                                <td>{data.startTime}</td>
                                <td>{data.attempts}</td>
                                <td>
                                    <Button 
                                        variant="outline-danger" 
                                        type="submit" 
                                        className='px-md-4 ms-2 remove-player-btn'
                                        
                                    >-</Button>
                                </td>
                            </tr>
                        ))}

                        
                    </tbody>
                </Table>

            </div>
            
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="add-player-form mt-4 d-flex justify-content-center">
                <Form.Group className="mb-3" controlId="player">
                    <Form.Control type="text" placeholder="Enter player id" required/>
                </Form.Group>
                <Button variant="outline-primary" type="submit" className='px-md-4 ms-2 add-player-btn'>
                    Add
                </Button>
            </Form>

        </Container>
        
    )
}
export default PlayerRegister