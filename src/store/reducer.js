// import { combineReducers } from 'redux';

// // reducer import
import customizationReducer from "./reducer/customizationReducer";

// // ==============================|| COMBINE REDUCER ||============================== //

// const reducer = combineReducers({
//   customization: customizationReducer
// });

// export default reducer;

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import common from "./reducer/common";
import { AuthReducer } from "./reducer/AuthReducer";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    customization: customizationReducer,
    commonData: common,
    auth: AuthReducer,
  });

export default rootReducer;
