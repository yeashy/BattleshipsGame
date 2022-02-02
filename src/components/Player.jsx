import player from '../imgs/ships/player.png';

var Player = (props) => {
    return (
        <img src={player} alt="" className='position-absolute' style={{ bottom: 0 + 'vh', left: props.position + 'vw', height: '18%' }} id='player' />
    )
}

export default Player;