import { combineReducers } from "redux";
import employeeReducers from "./reducer";

const rootReducer = combineReducers({
  data: employeeReducers,
});

export default rootReducer;
