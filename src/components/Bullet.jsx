import bullet from '../imgs/bullets/player_bullet.png';
import strong_bullet from '../imgs/bullets/strong_bullet.png';
import weak_bullet from '../imgs/bullets/weak_bullet.png'

var Bullet = (props) => {

    function whichImg() {//select an image depending on the type of bullet
        if (props.type === 'playerBullet') return bullet
        else if (props.type === 'weakBullet') return weak_bullet;
        else if (props.type === 'strongBullet') return strong_bullet;
    }

    return (
        <img src={whichImg()} alt="" className='position-absolute' style={{ left: props.x + 'px', bottom: props.y + 'px', zIndex: -2 }} />
    )
}

export default Bullet;