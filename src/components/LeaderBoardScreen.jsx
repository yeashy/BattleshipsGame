import Header from "./Header";
import Menu from "./Menu";

var LeaderboardScreen = (props) => {
    return (
        <div>
            <Header screen="Menu"/>
            <Menu plate="Leaderboard" />
        </div>
    )
}

export default LeaderboardScreen;