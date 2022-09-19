import {BrowserRouter,Routes,Route} from "react-router-dom";
import LoginForm from "../Login-form/index";
import PlayerRegister from "../PlayerRegister";
import PlayerAttemptions from "../PlayerAttemptions";
import ScoreTable from "../ScoreTable";


const Main = () =>{
    return(

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginForm/>}/>
                <Route path="/player-registration" element={<PlayerRegister/>}/>
               
                <Route path="/player-attemptions">
                    <Route path=":gameID" element={<PlayerAttemptions/>}/>
                </Route>
                <Route path="/score-tables" element={<ScoreTable/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default Main