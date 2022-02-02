import slowMoving from '../imgs/ships/enemies/moving_1.png';
import fastMoving from '../imgs/ships/enemies/moving_2.png';
import weakStanding from '../imgs/ships/enemies/standing_1.png';
import strongStanding from '../imgs/ships/enemies/standing_2.png';

var Enemy = (props) => {

    function whichImg() { //select an image depending on the type of enemy
        if (props.type === 'slowMoving') return slowMoving
        else if (props.type === 'fastMoving') return fastMoving
        else if (props.type === 'weakStanding') return weakStanding
        else if (props.type === 'strongStanding') return strongStanding
    }

    function whichSize() { //select a size of img depending on the type of enemy
        if (props.type === 'slowMoving') return '18%'
        else if (props.type === 'fastMoving') return '10%'
        else if (props.type === 'weakStanding') return '14%'
        else if (props.type === 'strongStanding') return '14.5%'
    }

    function whichBorder() { //select color of the top-border depending on enemy's hp
        if (props.hp === 1) return '2px solid green'
        else if (props.hp === 2) return '2px solid yellow'
        else if (props.hp === 3) return '2px solid orange'
        else if (props.hp === 4) return '2px solid red'
    }

    return (
        <img src={whichImg()} alt="" className='position-absolute' style={{ bottom: props.y + 'px', left: props.x + 'px', zIndex: -1, height: whichSize(), borderTop: whichBorder() }} />
    )
}

export default Enemy;