import createReactClass from "create-react-class";
import React from "react";
import { connect } from "react-redux";
import Boost from "../Boost";
import { boostMove } from "../../reducers/gameReducer";

var innerBoostContainer = createReactClass({
    boostMove: '',
    componentDidMount: function () {
        this.boostMove = setInterval(() => {
            this.props.boostMove();
        }, 20)
    },
    componentWillUnmount: function (){
        clearInterval(this.boostMove);
    },
    render: function () {
        return <Boost x={this.props.fallingBoost.x} y={this.props.fallingBoost.y} type={this.props.fallingBoost.type}/>
    }
})

function mapStateToProps(state) {
    return {
        fallingBoost: state.gameSection.game.fallingBoost
    }
}

const BoostContainer = connect(mapStateToProps, { boostMove })(innerBoostContainer);

export default BoostContainer;