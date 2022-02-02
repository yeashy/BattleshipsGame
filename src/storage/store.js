import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import gameReducer from "../reducers/gameReducer";

let reducers = combineReducers({
    gameSection: gameReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;