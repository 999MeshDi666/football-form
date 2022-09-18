import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {Container, Form, Button} from 'react-bootstrap';
import axios from "axios"
import doneImg from "../../static/images/done.png"


const BACKEND_URL = "http://127.0.0.1:8000"
const PlayerAttemptions = () =>{
  

    let { gameID } = useParams();
    const navigateNext = useNavigate();
    const navigateToReg = useNavigate()

    const [attemptsCount, setAttemptsCount] = useState()
    const [switchBtnCount, setSwitchBtnCount] = useState()
    const [matchID, setMatchID] = useState()
    const [playerLen, setPlayerLen] = useState()
    const [validated, setValidated] = useState(false);
    const [score, setScore] = useState({});
    const [isDone, setIsDone] = useState(false)
    const [postScore, setPostScore] = useState({})
    
    const handleNextGame = (id) =>{
        navigateNext(`/player-attemptions/${id}`)
        setIsDone(false)
    }

    const handleRedirectToReg = ()=>{
        navigateToReg('/player-registration')
    }

    const handleScoreOnChange = (e) =>{
        const { name, value } = e.target;
        setScore({
            ...score,
            [name]: parseInt(value),
        });
    }
    const handleSubmit = (event) => {   
        event.preventDefault()
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }else{
            setIsDone(true)
        }
        setValidated(true);
    };
    
    const handlePostScores = () =>{
        const sumValues = obj => Object.values(obj).reduce((a, b) => a + b)
        const totalScore = sumValues(score)
        
        axios.post(`${BACKEND_URL}/player_result_try/`, {
            matchID: matchID,
            gameID: parseInt(gameID),
            score_sum: totalScore,
        })
        .then((response)=>{


        })
        .catch(function(error) {
            console.log(error);
        });
    }
   
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/match/`)
        .then((response)=>{
            setAttemptsCount(response.data['match_settings'].try_count)
            setSwitchBtnCount(response.data['match_settings'].games_count)
            setMatchID(response.data['match_id'])
            setPlayerLen(response.data['players'].length)
        })
        .catch(function(error) {
            console.log(error);
        });
    })

    return(
        <Container>
            <h1 className="match-title text-center mt-5 mb-4 fw-bold">Match: #{matchID} | Players: {playerLen}</h1>
            <p></p>
            <div className='switch-btn-wrapper'>
                {(() => {
                    const switchBtn = [];
                    for (let i = 1; i <= switchBtnCount; i++) {
                        switchBtn.push(
                            <button key={i} className="switch-btn" onClick={ () => handleNextGame(i)}>{i}</button>
                        );
                    }
                    return switchBtn;
                })()}
            </div>
            {
                isDone ?
                <div className='d-flex flex-column'>
                    <img src={doneImg} alt="done" className='done-img'/>
                    <Button 
                        variant="success" 
                        className='done-btn'
                        onClick = {handleRedirectToReg}
                    >Done</Button>
                </div>  
                :
                <Form noValidate validated={validated} onSubmit={handleSubmit} className="add-attempts-form mt-5 attempts-form">
                    {(() => {
                        const attemptsToAdd = [];
                        for (let i = 1; i <= attemptsCount; i++) {
                            attemptsToAdd.push(
                                <Form.Group className="mb-3" controlId="attempts" key = {`attempt${i}`} >
                                    <Form.Label>attempt{i}</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        name ={`attempts_score${i}`} 
                                        required 
                                        onChange = {handleScoreOnChange}
                                    />
                                </Form.Group>
                            )
                        }
                        return attemptsToAdd;
                    })()}
                    <Button 
                        variant="outline-primary" 
                        type="submit" 
                        className='done-btn px-4 ms-4 mb-5'
                        onClick = {handlePostScores}
                    >Done</Button>
                </Form>
                 
            }
            
        </Container>
    )

}
export default PlayerAttemptions