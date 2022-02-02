import React from "react";
import createReactClass from "create-react-class";
import { connect } from "react-redux";
import Explosion from "../Explosion";
import { checkBooms, frameChange } from "../../reducers/gameReducer";

var innerExplosionContainer = createReactClass({
    checkBooms: '',
    frameChange: '',
    componentDidMount: function () {
        this.checkBooms = setInterval(() => {
            this.props.checkBooms()
        }, 20)
        this.frameChange = setInterval(() => {
            this.props.frameChange();
        }, 50);
    },
    componentWillUnmount: function(){
        clearInterval(this.checkBooms);
        clearInterval(this.frameChange);
    },
    render: function () {
        return (
            this.props.explosionsArr.map(el => {
                if (el.isPlayerDamaged === true && el.frame < 4) { // returns red translucent screen if player damaged
                    return (
                        <div>
                            <div className="position-absolute opacity-25 damage-div"></div> 
                            <Explosion type={el.type} x={el.x} y={el.y} key={el.id} frame={el.frame} />
                        </div>
                    )
                }
                else return <Explosion type={el.type} x={el.x} y={el.y} key={el.id} frame={el.frame} />
            })
        )
    }
})

function mapStateToProps(state) {
    return {
        lifetime: state.gameSection.lifetime,
        explosionsArr: state.gameSection.game.explosions.explosionsArr
    }
}

const ExplosionContainer = connect(mapStateToProps, { checkBooms, frameChange })(innerExplosionContainer);

export default ExplosionContainer;