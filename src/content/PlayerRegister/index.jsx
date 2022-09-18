import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // for React, Vue and Svelte
import {Table, Form, Button, Container} from 'react-bootstrap';
import transformData from "../../transformator";



const BACKEND_URL = "http://127.0.0.1:8000"
const PlayerRegister = () =>{
    var notyf = new Notyf({
        duration: 1000,
        position: {
          x: 'right',
          y: 'top',
        }
    });
    const [validated, setValidated] = useState(false);
    const [players, setPlayers] = useState([]);
    const [playerID, setPlayerID] = useState(0)
    const [matchID, setMatchID] = useState()
    const [playerLen, setPlayerLen] = useState()
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const handleChange = (e)=>{
        setPlayerID(e.target.value)
    }

    const handleAddPlayer = (e)=>{
        e.preventDefault()
        axios.post(`${BACKEND_URL}/add_player/?id=${playerID}`) 
        .then((response)=>{
            setPlayers(transformData(response.data)) 
            setTimeout(()=>{
                navigate("/player-attemptions/1");
            },2000)
            // debugger
        })
        .catch(function(error) {
            console.log(error);
            notyf.error('Player not found');
        });
        
        setPlayerID("")
    }
    
    const handleRemoverPlayer = (uid) =>{
        axios.post(`${BACKEND_URL}/delete_player/?id=${uid}`)
        .then((response)=>{
            setPlayers(transformData(response.data)) 
        })
        .catch(function(error) {
            console.log(error);

        });
    }

    
  
    useEffect(()=>{
        
        axios.get(`${BACKEND_URL}/match/`)
        .then((response)=>{
            console.log(response.data)
            setPlayers(transformData(response.data))
            setMatchID(response.data['match_id'])
            setPlayerLen(response.data['players'].length)
   
        })
        .catch(function(error) {
            console.log(error);
        });
        
    },[])
    
    return(
        <Container>
            <h1 className="match-title text-center mt-5 mb-4 fw-bold">Match: #{matchID} | Players: {playerLen}</h1>
            <div className="table-wrapper">
                <Table striped bordered hover className="text-center mx-auto player-table">
                    <thead>
                        <tr>
                            <th>Player ID</th>
                            <th>Start time</th>
                            <th>Attempts</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players && players.length>0 && players.map((data)=>(
                            <tr key={data.uid}>
                                <td>{data.uid}</td>
                                <td>{data.startTime}</td>
                                <td>{data.attempts}</td>
                                <td>
                                    <Button 
                                        variant="outline-danger" 
                                        type="submit" 
                                        className='px-md-4 ms-2 remove-player-btn'
                                        onClick={ () => handleRemoverPlayer(data.uid)}
                                    >-</Button>
                                </td>
                            </tr>
                        ))}

                        
                    </tbody>
                </Table>

            </div>
            
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="add-player-form mt-4 d-flex justify-content-center">
                <Form.Group className="mb-3" controlId="player">
                    <Form.Control type="number" placeholder="Enter player id" onChange={handleChange} required/>
                </Form.Group>
                <Button 
                    variant="outline-primary" 
                    type="submit" 
                    className='px-md-4 ms-2 add-player-btn'
                    onClick={handleAddPlayer}
                >Add</Button>
            </Form>

        </Container>
        
    )
}
export default PlayerRegister