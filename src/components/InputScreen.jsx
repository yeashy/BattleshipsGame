import Header from "./Header"
import Menu from "./Menu";

var InputScreen = (props) => {
    return (
        <div>
            <Header screen='Menu' />
            <Menu plate="Input" leaderboard={props.leaderboard}/>
        </div>
    )
}

export default InputScreen;