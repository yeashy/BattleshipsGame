import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../imgs/logo.png';

var Header = (props) => { // if boost activated set opacity to 100
    function drawBoost() {
        if (props.boostType === '') return (
            <p className='mb-0 opacity-0'>Boost:</p>
        )
        else return (
            <p className='mb-0'>Boost: {props.boostType} | {props.boostTime}s remaining</p>
        )
    }

    function which() { // select text in header
        if (props.screen === "Game") return (
            <div className='d-sm-flex col-12'>
                <div className='col-xl-1 col-sm-2 col-12 mx-2'><p className='mb-0'>HP:{props.hp}</p></div>
                <div className='col-xl-1 col-sm-2 col-12 mx-2'><p className='mb-0'>Score:{props.score}</p></div>
                <div className='col-8 mx-2'>{drawBoost()}</div>

            </div>
        )
        else if (props.screen === "Menu") return (
            <Nav className='me-auto'>
                Battleships game
            </Nav>
        )
    }

    return (
        <Navbar>
            <Container>
                <Navbar.Brand>
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                {which()}
            </Container>
        </Navbar>
    )
}

export default Header;