import bg from '../imgs/bg.png'
import Plate from './Plate';
import LeaderboardContainer from './containers/LeaderboardContainer';
import Input from './Input';
import Result from './Result';
import Settings from './Settings';

var Menu = (props) => {

    function which() { // select plate depending on active screen
        if (props.plate === "Plate") return <Plate />;
        else if (props.plate === "Leaderboard") return <LeaderboardContainer />;
        else if (props.plate === "Input") return <Input leaderboard={props.leaderboard} />;
        else if (props.plate === "Result") return <Result score={props.score} />
        else if (props.plate === "Settings") return <Settings />
    }

    return (
        <div className='d-flex justify-content-center align-items-center menu-bg w-100'>
            <img src={bg} style={{ zIndex: -2, filter: 'blur(3px)' }} className='position-absolute' alt='' />
            {which()}
        </div>
    )
}

export default Menu;