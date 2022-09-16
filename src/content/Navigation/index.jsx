import {BrowserRouter,Routes,Route} from "react-router-dom";
import LoginForm from "../Login-form/index";
import PlayerRegister from "../PlayerRegister";
import PlayerAttemptions from "../PlayerAttemptions";

const Navigation = () =>{
    return(

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginForm/>}/>
                <Route path="/player-registration" element={<PlayerRegister/>}/>
                <Route path="/player-attemptions" element={<PlayerAttemptions/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default Navigation