import explosion1_1 from '../imgs/explosions/Explosion1/Explosion1_1.png';
import explosion1_2 from '../imgs/explosions/Explosion1/Explosion1_2.png';
import explosion1_3 from '../imgs/explosions/Explosion1/Explosion1_3.png';
import explosion1_4 from '../imgs/explosions/Explosion1/Explosion1_4.png';
import explosion1_5 from '../imgs/explosions/Explosion1/Explosion1_5.png';
import explosion1_6 from '../imgs/explosions/Explosion1/Explosion1_6.png';
import explosion1_7 from '../imgs/explosions/Explosion1/Explosion1_7.png';
import explosion1_8 from '../imgs/explosions/Explosion1/Explosion1_8.png';
import explosion1_9 from '../imgs/explosions/Explosion1/Explosion1_9.png';
import explosion1_10 from '../imgs/explosions/Explosion1/Explosion1_10.png';
import explosion1_11 from '../imgs/explosions/Explosion1/Explosion1_11.png';

import explosion2_1 from '../imgs/explosions/Explosion2/Explosion2_1.png';
import explosion2_2 from '../imgs/explosions/Explosion2/Explosion2_2.png';
import explosion2_3 from '../imgs/explosions/Explosion2/Explosion2_3.png';
import explosion2_4 from '../imgs/explosions/Explosion2/Explosion2_4.png';
import explosion2_5 from '../imgs/explosions/Explosion2/Explosion2_5.png';
import explosion2_6 from '../imgs/explosions/Explosion2/Explosion2_6.png';
import explosion2_7 from '../imgs/explosions/Explosion2/Explosion2_7.png';
import explosion2_8 from '../imgs/explosions/Explosion2/Explosion2_8.png';
import explosion2_9 from '../imgs/explosions/Explosion2/Explosion2_9.png';
import explosion2_10 from '../imgs/explosions/Explosion2/Explosion2_10.png';
import explosion2_11 from '../imgs/explosions/Explosion2/Explosion2_11.png';

import explosion3_1 from '../imgs/explosions/Explosion3/Explosion3_1.png';
import explosion3_2 from '../imgs/explosions/Explosion3/Explosion3_2.png';
import explosion3_3 from '../imgs/explosions/Explosion3/Explosion3_3.png';
import explosion3_4 from '../imgs/explosions/Explosion3/Explosion3_4.png';
import explosion3_5 from '../imgs/explosions/Explosion3/Explosion3_5.png';
import explosion3_6 from '../imgs/explosions/Explosion3/Explosion3_6.png';
import explosion3_7 from '../imgs/explosions/Explosion3/Explosion3_7.png';
import explosion3_8 from '../imgs/explosions/Explosion3/Explosion3_8.png';
import explosion3_9 from '../imgs/explosions/Explosion3/Explosion3_9.png';
import explosion3_10 from '../imgs/explosions/Explosion3/Explosion3_10.png';
import explosion3_11 from '../imgs/explosions/Explosion3/Explosion3_11.png';

var Explosion = (props) => {

    function whichExplosion() { //select img depending on frame
        if (props.type === 'playerDeath') {
            if (props.frame === 1) return explosion1_1;
            else if (props.frame === 2) return explosion1_2;
            else if (props.frame === 3) return explosion1_3;
            else if (props.frame === 4) return explosion1_4;
            else if (props.frame === 5) return explosion1_5;
            else if (props.frame === 6) return explosion1_6;
            else if (props.frame === 7) return explosion1_7;
            else if (props.frame === 8) return explosion1_8;
            else if (props.frame === 9) return explosion1_9;
            else if (props.frame === 10) return explosion1_10;
            else if (props.frame === 11) return explosion1_11;
        }
        else if (props.type === 'bulletCrash') {
            if (props.frame === 1) return explosion2_1;
            else if (props.frame === 2) return explosion2_2;
            else if (props.frame === 3) return explosion2_3;
            else if (props.frame === 4) return explosion2_4;
            else if (props.frame === 5) return explosion2_5;
            else if (props.frame === 6) return explosion2_6;
            else if (props.frame === 7) return explosion2_7;
            else if (props.frame === 8) return explosion2_8;
            else if (props.frame === 9) return explosion2_9;
            else if (props.frame === 10) return explosion2_10;
            else if (props.frame === 11) return explosion2_11;
        }
        else if (props.type === 'enemyDeath') {
            if (props.frame === 1) return explosion3_1;
            else if (props.frame === 2) return explosion3_2;
            else if (props.frame === 3) return explosion3_3;
            else if (props.frame === 4) return explosion3_4;
            else if (props.frame === 5) return explosion3_5;
            else if (props.frame === 6) return explosion3_6;
            else if (props.frame === 7) return explosion3_7;
            else if (props.frame === 8) return explosion3_8;
            else if (props.frame === 9) return explosion3_9;
            else if (props.frame === 10) return explosion3_10;
            else if (props.frame === 11) return explosion3_11;
        }
    }

    function whichSize() { //select size of explosion's img 
        if (props.type === 'playerDeath') return '18%';
        else if (props.type === 'bulletCrash') return '8%';
        else if (props.type === 'enemyDeath') return '15%'
    }

    return (
        <img src={whichExplosion()} className='position-absolute' style={{ bottom: props.y, left: props.x, height: whichSize(), zIndex: -1 }} alt="" />
    )
}

export default Explosion;