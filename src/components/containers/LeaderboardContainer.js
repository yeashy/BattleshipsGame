import { connect } from "react-redux";
import React from "react";
import Leaderboard from "../Leaderboard";

class innerLeaderboardContainer extends React.Component {
    render() {
        return (
            <Leaderboard {...this.props} />
        )
    }
}

function mapStateToProps(state) {
    return {
        leaderboard: state.gameSection.logic.leaderboard
    }
}

const LeaderboardContainer = connect(mapStateToProps, {})(innerLeaderboardContainer);

export default LeaderboardContainer;