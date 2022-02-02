import heal from '../imgs/boosts/heal.png';
import speed from '../imgs/boosts/speed.png';
import shootSpeed from '../imgs/boosts/shot_speed.png';
import slow from '../imgs/boosts/slow.png';

var Boost = (props) => {
    function whichImg() { //select an image depending on the type of boost
        if (props.type === '') return;
        else if (props.type === 'heal') return heal;
        else if (props.type === 'speed') return speed;
        else if (props.type === 'shootSpeed') return shootSpeed;
        else if (props.type === 'slow') return slow;
    }

    function opacityCleaner() { //if there is no boost make the image transparent, because otherwise it will be visible at 0 0
        if (props.type === '') return 'position-absolute opacity-0';
        else return 'position-absolute opacity-75';
    }

    return (
        <img src={whichImg()} alt="" className={opacityCleaner()} style={{ left: props.x, bottom: props.y, height: '6%', border: '1px solid white', borderRadius: '20px', zIndex: -1 }} />
    )
}

export default Boost;