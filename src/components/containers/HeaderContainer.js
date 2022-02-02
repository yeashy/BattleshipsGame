import { connect } from "react-redux";
import React from "react";
import Header from "../Header";

class innerHeaderContainer extends React.Component {
    render() {
        return (
            <Header {...this.props} screen="Game" />
        )
    }
}

function mapStateToProps(state) {
    return {
        hp: state.gameSection.game.player.hp,
        score: state.gameSection.game.player.score,
        boostType: state.gameSection.game.player.boost.type,
        boostTime: state.gameSection.game.player.boost.timeout
    }
}

const HeaderContainer = connect(mapStateToProps, {})(innerHeaderContainer);

export default HeaderContainer;