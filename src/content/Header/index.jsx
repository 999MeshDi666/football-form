import logo from '../../static/images/football-logo2.png'
import {Container, Navbar} from 'react-bootstrap';

const Header = () =>{
    return(
        <Navbar bg="dark" expand="lg" className='navbar-dark navbar-purple'>
            <Container className='justify-content-between'>
                <Navbar.Text className='ms-4 text-white fw-bold navbar-logo-title'>Вход оператора</Navbar.Text>
                <Navbar.Brand className='d-flex'>
                    <img src={logo} alt="logo" className='navbar-logo'/> 
                </Navbar.Brand>
            </Container>
        </Navbar>

    )
}
export default Header