import {BrowserRouter,Routes,Route} from "react-router-dom";
import LoginForm from "../Login-form/index";
import PlayerRegister from "../PlayerRegister";

const Navigation = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginForm/>}/>
                <Route path="/playerRegistration" element={<PlayerRegister/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default Navigation