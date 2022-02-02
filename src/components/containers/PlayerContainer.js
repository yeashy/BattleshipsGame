import { connect } from "react-redux";
import React from "react";
import Player from "../Player";
import { chooseDir, chooseMoveDir, lifeTime, endAllGame, boostTimeout } from "../../reducers/gameReducer";
import createReactClass from "create-react-class";

var innerPlayerContainer = createReactClass({
    isMoving: false,
    lifetime: '',
    chooseDir: '',
    boostTime: '',
    handleMove: function (e) {
        this.props.chooseDir(e.code);
        if (this.isMoving === false) this.chooseDir = setInterval(() => {
            this.props.chooseMoveDir(this.props.player.direction);
        }, 1)
        this.isMoving = true;
    },
    handleDontMove: function (e) {
        if (e.code === this.props.leftKey || e.code === this.props.rightKey) this.props.chooseDir('none'); // if keyup player's ships stops right where it is
    },
    componentDidMount: function () {
        window.addEventListener('keydown', this.handleMove);
        window.addEventListener('keyup', this.handleDontMove);
        this.lifetime = setInterval(() => {
            this.props.lifeTime();
            if (this.props.isEnded) {
                this.props.endAllGame('lost');
            }
        }, 20);

        this.boostTime = setInterval(() => {
            this.props.boostTimeout();
        }, 1000);
    },
    componentWillUnmount: function () {
        clearInterval(this.chooseDir);
        clearInterval(this.lifetime);
        clearInterval(this.boostTime);
    },
    render: function () {
        return (
            <Player position={this.props.player.position} />
        )
    }
})

function mapStateToProps(state) {
    return {
        player: {
            position: state.gameSection.game.player.position,
            direction: state.gameSection.game.player.direction,
            boostTime: state.gameSection.game.player.boost.timeout
        },
        leftKey: state.gameSection.logic.controls.leftKey,
        rightKey: state.gameSection.logic.controls.rightKey,
        isEnded: state.gameSection.game.isEnded
    }
}

const PlayerContainer = connect(mapStateToProps, { chooseDir, chooseMoveDir, lifeTime, endAllGame, boostTimeout })(innerPlayerContainer);

export default PlayerContainer;