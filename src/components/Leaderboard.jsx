import { useDispatch } from "react-redux";
import { startActionCreator } from "../reducers/gameReducer";
import Leader from "./Leader";

var Leaderboard = (props) => {
    const dispatch = useDispatch()

    function onStart() { // move to start screen on back button
        dispatch(startActionCreator(0, 'start'));
    }

    return (
        <div className="menu d-flex flex-column align-items-center justify-content-between py-2 px-5">
            <div className="d-flex col-12 align-items-center flex-column">
                <div className="d-flex mb-3"><h4><strong>Leaderboard:</strong></h4></div>
                {props.leaderboard.map((value, index) => {
                    return (
                        <Leader name={value.name} score={value.score} key={index} />
                    )
                })}
            </div>
            <div className="d-flex align-items-center">
                <button onClick={onStart}>Back</button>
            </div>
        </div>
    )
}

export default Leaderboard;