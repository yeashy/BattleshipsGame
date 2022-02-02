import createReactClass from "create-react-class";
import React from "react";
import { connect } from "react-redux";
import Bullet from "../Bullet";
import { checkEnemyShoot, enemyBulletMove } from "../../reducers/gameReducer";

var innerEnemyBulletContainer = createReactClass({
    enemyBullet: '',
    componentDidMount: function () {
        this.enemyBullet = setInterval(() => {
            this.props.checkEnemyShoot();
            this.props.enemyBulletMove();
        }, 20);
    },
    componentWillUnmount: function (){
        clearInterval(this.enemyBullet);
    },
    render: function () {
        return (
            this.props.bulletsArr.map(el => {
                return <Bullet x={el.x} y={el.y} type={el.type} key={el.id} />
            })
        )
    }
})

function mapStateToProps(state) {
    return {
        lifetime: state.gameSection.lifetime,
        standingArr: state.gameSection.game.enemies.standingArr,
        bulletsArr: state.gameSection.game.enemies.bullets.bulletsArr
    }
}

const EnemyBulletContainer = connect(mapStateToProps, { checkEnemyShoot, enemyBulletMove })(innerEnemyBulletContainer);

export default EnemyBulletContainer;