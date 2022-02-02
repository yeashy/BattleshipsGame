import Header from "./Header"
import Menu from "./Menu";

var ResultScreen = (props) => {
    return(
        <div>
            <Header screen="Menu"/>
            <Menu plate="Result" score={props.score}/>
        </div>
    )
}

export default ResultScreen;