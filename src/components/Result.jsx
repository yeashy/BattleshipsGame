import React from "react";
import { useDispatch } from "react-redux";
import { startActionCreator } from "../reducers/gameReducer";

var Result = (props) => {

    const dispatch = useDispatch();

    function submit() { // move to start screen
        dispatch(startActionCreator(0, 'start'))
    }

    return (
        <div className="menu d-flex flex-column align-items-center justify-content-evenly p-2">
            <div className="d-flex mb-3 h-25"><h4><strong>Congrats! your score is {props.score}!</strong></h4></div>
            <div className="col-4 mb-3 h-50">
                <button className="start-btn col-12 h-50" onClick={submit}>Back to menu</button>
            </div>
        </div>
    )
}

export default Result;