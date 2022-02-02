import bg from '../imgs/bg.png'
import BulletContainer from './containers/BulletContainer';
import EnemyContainer from './containers/EnemyContainer';
import HeaderContainer from "./containers/HeaderContainer";
import PlayerContainer from "./containers/PlayerContainer";
import EnemyBulletContainer from './containers/EnemyBulletContainer';
import ExplosionContainer from './containers/ExplosionContainer';
import BoostContainer from './containers/BoostContainer';
import PauseMenu from './PauseMenu';

var GameScreen = () => {
    return (
        <div>
            <HeaderContainer />
            <div className='d-flex justify-content-center align-items-center menu-bg w-100'>
                <img src={bg} style={{ zIndex: -4, filter: 'blur(1px)' }} className='position-absolute' alt='' />
                <PauseMenu />
            </div>
            <PlayerContainer />
            <BulletContainer />
            <EnemyContainer />
            <EnemyBulletContainer />
            <ExplosionContainer />
            <BoostContainer />
        </div>
    )
}

export default GameScreen;