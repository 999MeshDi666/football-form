import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {Table, Form, Button, Container} from 'react-bootstrap';
import axios from "axios"


const BACKEND_URL = "http://127.0.0.1:8000"
const ScoreTables = ()=>{
    const [players, setPlayers] = useState([])


    useEffect(()=>{
        axios.get('data.json')
        .then((response)=>{
            console.log(response.data)
            // setPlayers(transformData(response.data))
            // setMatchID(response.data['match_id'])
            // setPlayerLen(response.data['players'].length)
   
        })
        .catch(function(error) {
            console.log(error);
        });
        
        
    },[])
    // console.log(players)

    return(
        <Container>
            <div className='table-wrapper'>
                <Table striped bordered hover className="text-center mx-auto player-table mt-5">
                    <thead>
                        <tr>
                            <th>Player ID</th>
                            <th>Attempts</th>
                            <th>Scores</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {players && players.length>0 && players.map((data)=>(
                            <tr key={data.uid}>
                                <td>{data.uid}</td>
                                <td>{data.startTime}</td>
                                <td>{data.attempts}</td>
                                <td>
                                    <Button 
                                        variant="outline-danger" 
                                        type="submit" 
                                        className='px-md-4 ms-2 remove-player-btn'
                                        // onClick={ () => handleRemoverPlayer(data.uid)}
                                    >-</Button>
                                </td>
                            </tr>
                        ))} */}

                        
                    </tbody>
                </Table>


            </div>

        </Container>
       
        
    )
}
export default ScoreTables