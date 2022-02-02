import React from "react";
import LeaderboardLink from "./LeaderboardLink";
import { startActionCreator } from "../reducers/gameReducer";
import { useDispatch } from "react-redux";

var Plate = () => { // starter menu plate
    let difficultyRef = React.createRef();
    const dispatch = useDispatch()

    function onStart() {
        dispatch(startActionCreator(difficultyRef.current.value, 'game'));
    }

    return (
        <div className="menu d-flex flex-column align-items-center justify-content-between p-2">
            <div className="d-flex mb-3"><h4><strong>Menu:</strong></h4></div>
            <div className="d-flex flex-sm-row flex-column justify-content-sm-around justify-content-center col-12">
                <div className="col-sm-5 mb-3">
                    <h5 className="d-flex justify-content-center"><strong>Difficulty:</strong></h5>
                    <select name="difficulty" id="difficulty" className="col-12 d-flex" ref={difficultyRef}>
                        <option value="1">Easy</option> {/*this values are for correct coefficient of enemy speed etc.*/}
                        <option value="1.2">Normal</option>
                        <option value="1.4">Hard</option>
                    </select>
                </div>
                <LeaderboardLink />
            </div>
            <div className="col-4 mb-3 h-25">
                <button className="start-btn col-12 h-75" onClick={onStart}>Start!</button>
            </div>
        </div>
    )
}

export default Plate;