import Header from "./Header";
import Menu from "./Menu";
import { startActionCreator } from "../reducers/gameReducer";
import { useDispatch } from "react-redux";

var StartScreen = () => {
    const dispatch = useDispatch()

    function onStart() { // move to settings screen
        dispatch(startActionCreator(0, 'settings'));
    }

    return (
        <div>
            <Header screen="Menu" />
            <Menu plate="Plate" />
            <button className="position-absolute p-2" style={{right: '10px', bottom: '10px'}} onClick={onStart}><i className="fas fa-cog fa-3x"></i></button>
        </div>
    )
}

export default StartScreen;