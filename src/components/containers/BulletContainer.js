import createReactClass from "create-react-class";
import React from "react";
import { connect } from "react-redux";
import Bullet from "../Bullet";
import { bulletSpawn, bulletMove } from "../../reducers/gameReducer";

var innerBulletContainer = createReactClass({
    isPressed: false,
    isAlreadyShot: false,
    bulletMove: '',
    bulletSpawn: '',
    isSpeedIncreased: false,
    flag: false,
    spawn: function (e) {
        if (e.code === this.props.shootKey) { 
            window.removeEventListener('keydown', this.spawn);
            setTimeout(() => { // this is so player can't spam bullets
                window.addEventListener('keydown', this.spawn)
            }, 500);

            if (!this.isAlreadyShot) {
                this.props.bulletSpawn();
            }
            this.isAlreadyShot = true; // crutch (i don't khow how it's named in english), but it's very important thing
            this.isPressed = true;
        }
    },
    keyUp: function (e) {
        if (e.code === this.props.shootKey) {
            this.isAlreadyShot = false;
            this.isPressed = false;
        }
    },
    componentDidMount: function () {
        this.bulletMove = setInterval(() => {
            if (this.isPressed === false) { }
            else this.props.bulletSpawn();
        }, 500);

        window.addEventListener('keydown', this.spawn);
        window.addEventListener('keyup', this.keyUp)
        this.bulletSpawn = setInterval(() => { // increase speed if player have the right boost
            this.props.bulletMove();
            if (this.props.boostType === 'Increase rate of fire') {
                if (!this.flag) {
                    clearInterval(this.bulletMove);
                    this.bulletMove = setInterval(() => {
                        if (this.isPressed === false) { }
                        else this.props.bulletSpawn();
                    }, 250);
                }
                this.flag = true;
            }
            else {
                if (this.flag) {
                    clearInterval(this.bulletMove);
                    this.bulletMove = setInterval(() => { // standart speed of fire
                        if (this.isPressed === false) { } // ????
                        else this.props.bulletSpawn();
                    }, 500);
                }
                this.flag = false;
            }
        }, 20)
    },
    componentWillUnmount: function () {
        window.removeEventListener('keydown', this.spawn);
        window.removeEventListener('keyup', this.keyUp);
        clearInterval(this.bulletMove);
        clearInterval(this.bulletSpawn);
    },
    render: function () {
        return (
            this.props.bullets.map(el => {
                return (
                    <Bullet x={el.x} y={el.y} key={el.id} id={el.id} type='playerBullet' />
                )
            })
        )
    }
});

function mapStateToProps(state) {
    return {
        bullets: state.gameSection.game.player.bullets.bulletsArr,
        lifetime: state.gameSection.lifetime,
        boostType: state.gameSection.game.player.boost.type,
        shootKey: state.gameSection.logic.controls.shootKey
    }
}

const BulletContainer = connect(mapStateToProps, { bulletSpawn, bulletMove })(innerBulletContainer);

export default BulletContainer;