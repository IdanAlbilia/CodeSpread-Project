import threadReducer from "./threadReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({ threadReducer });

export default allReducers;
