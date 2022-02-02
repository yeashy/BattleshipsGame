import { startActionCreator } from "../reducers/gameReducer";
import { useDispatch } from "react-redux";

var LeaderboardLink = () => {

    const dispatch = useDispatch()

    function onStart() { //move to leaderboard screen
        dispatch(startActionCreator(0, 'leaderboard'));
    }

    return (
        <div className="d-flex flex-column col-sm-5 mb-3">
            <h5 className="d-flex justify-content-center"><strong>Leaderboard:</strong></h5>
            <button className="text-decoration-none col-12 justify-content-center d-flex a-holder p-0" onClick={onStart}>
                <p className="mb-0 link-to-lead">View</p>
            </button>
        </div>
    )
}

export default LeaderboardLink;