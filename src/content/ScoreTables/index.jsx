import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {Table, Form, Button, Container} from 'react-bootstrap';
import axios from "axios"
import { transformDataScores } from "../../transformator";

const BACKEND_URL = "http://127.0.0.1:8000"
const ScoreTables = ()=>{

    const [players, setPlayers] = useState([])

    useEffect(()=>{
        
        axios.get(`${BACKEND_URL}/match_result/`)
        .then((response)=>{
            setPlayers(response.data)
        })
        .catch(function(error) {
            console.log(error);
        });
        
    },[])

        

    return(
        <Container>
            <div className='table-wrapper'>
                <Table striped bordered hover className="text-center mx-auto mt-5 player-table ">
                    <thead>
                        <tr>
                            <th>Player ID</th>
                            <th>Scoresc</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            Object.keys(players).map(key =>(
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>
                                        <ul>
                                            {Object.values(players[key]).map((data, index)=>(
                                                <li>{Object.keys(players[key])[index]}: {data}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>  
                            ))
                        }
                    </tbody>
                </Table>


            </div>

        </Container>
       
        
    )
}
export default ScoreTables