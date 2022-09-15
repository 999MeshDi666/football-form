import logo from '../../static/images/football-logo.png'
import {Container, Navbar} from 'react-bootstrap';

const Header = () =>{
    return(
        <Navbar bg="dark" expand="lg" className='navbar-dark'>
            <Container className='justify-content-start'>
                <Navbar.Brand className='d-flex'>
                    <img src={logo} alt="logo" className='navbar-logo'/> 
                    <p className='mx-2 mb-0 fw-bold'>VFC</p>
                </Navbar.Brand>
                <Navbar.Text className='ms-4 fs-5'>Вход оператора</Navbar.Text>
            </Container>
        </Navbar>

    )
}
export default Header