import { combineReducers } from "redux";
import news from "./newsReducers";

const rootReducer = combineReducers({
  news
});

export default rootReducer;
