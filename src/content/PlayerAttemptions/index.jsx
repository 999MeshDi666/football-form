import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {Container, Form, Button} from 'react-bootstrap';
import axios from "axios"
import doneImg from "../../static/images/done.png"
import { Notyf } from 'notyf';


const BACKEND_URL = "http://127.0.0.1:8000"
const PlayerAttemptions = () =>{
    
    var notyf = new Notyf({
        duration: 1000,
        position: {
          x: 'right',
          y: 'top',
        }
    });

    let { gameID } = useParams();
    const navigateNext = useNavigate();
    const navigateToReg = useNavigate()

    const [switchBtn, setSwitchBtn] = useState([])
    const [matchID, setMatchID] = useState()
    const [playerLen, setPlayerLen] = useState()
    const [validated, setValidated] = useState(false)

    const playerID = sessionStorage.getItem("playerID")
    const [attemptsCount, setAttemptsCount] = useState()
    const [score, setScore] = useState({})
    const [isDone, setIsDone] = useState(false)
    // const [switch]
    
    const handleNextGame = (id) =>{
        navigateNext(`/player-attemptions/${id}`)
        setIsDone(switchBtn[id-1].isDisabled)
        
        
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

    const scoreValidation = (event) =>{
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            notyf.error('Enter all scores');
        }else{
            setIsDone(true)
            setSwitchBtn((prevState)=>
                prevState.map((btn)=>{
                    if(btn.btnID === parseInt(gameID)){
                        return{...btn, isDisabled: !btn.isDisabled}
                    }else return btn
                })
            )
        }
        setValidated(true);

    }
    
    const handleSubmit = (event) => {   
        event.preventDefault()
        scoreValidation(event)
    };
    
    const handlePostScores = () =>{
        const sumValues = obj => Object.values(obj).reduce((a, b) =>  a + b)
        const totalScore = sumValues(score)
        console.log({match_id: matchID, player_id: playerID, game_id: parseInt(gameID), result: totalScore})
    }
  
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/match/`)
        .then((response)=>{
            for(let i = 1; i<=response.data['match_settings'].games_count ; i++){
                setSwitchBtn((prevState)=>[...prevState, {btnID: i, isDisabled: false}])
            }
            setAttemptsCount(response.data['match_settings'].try_count)
            setMatchID(response.data['match_id'])
            setPlayerLen(response.data['players'].length)
            
        })
        .catch(function(error) {
            console.log(error);
        });
    }, [])
 
    return(
        <Container>
            <h1 className="match-title text-center mt-5 mb-2 fw-bold">Match: #{matchID} | Players: {playerLen}</h1>
            <p className="match-title text-center mb-4 fw-bold">Player: {playerID}</p>
            <div className='switch-btn-wrapper'>
                {switchBtn.map((data)=>(
                    <fieldset key={data.btnID}>
                        <input 
                        type="radio"
                        id = {data.btnID} 
                        name="switch games"
                        className="switch-btn"
                        disabled = {data.isDisabled} 
                        defaultChecked = {data.btnID === 1}
                        onChange={ () => handleNextGame(data.btnID)}
                        />
                        <label htmlFor={data.btnID} className="switch-btn-label" >{data.btnID}</label>
                    </fieldset>
                ))}
            </div>
            {
                isDone ?
                <div className='d-flex flex-column'>
                    <img src={doneImg} alt="done" className='done-img'/>
                    <Button 
                        variant="success" 
                        className='done-btn'
                        onClick = {handleRedirectToReg}
                    >Home</Button>
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
                        type='submit'
                        variant="outline-primary" 
                        className='done-btn mb-4'
                        onClick = {handlePostScores}
                    >Done</Button>
                </Form>
                 
            }
            
        </Container>
    )

}
export default PlayerAttemptions