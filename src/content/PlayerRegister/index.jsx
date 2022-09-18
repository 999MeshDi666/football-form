import { useState } from "react";
import { useEffect } from "react";
import axios from "axios"
import Container from "react-bootstrap/esm/Container"
import {Table, Form, Button} from 'react-bootstrap';
import transformData from "../../transformator";


const BACKEND_URL = "http://127.0.0.1:8000"

const PlayerRegister = () =>{
    const [validated, setValidated] = useState(false);
    const [players, setPlayers] = useState([]);
    const [playerID, setPlayerID] = useState(0)
    const [matchID, setMatchID] = useState()
    const [playerLen, setPlayerLen] = useState()
    
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
            setPlayers((prevItems) => [...prevItems, response.data])
        })
        .catch(function(error) {
            console.log(error);
        });
        
        setPlayerID("")
    }
    
    const handleRemoverPlayer = (uid) =>{
        axios.post(`${BACKEND_URL}/delete_player/?id=${uid}`)
        .then((response)=>{
            const deletedPlayer = response.data;
            setPlayers(players.filter((player)=>{
                return deletedPlayer.uid !== player.uid
            }))
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
            <h1 className="match-title text-center mt-5 mb-4 fw-bold">Match: #{matchID} | Players: {playerLen}  </h1>
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