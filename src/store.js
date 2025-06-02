import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, combineReducers, createStore } from "redux";
import taskReducer from "./reducer/taskReducer";

const rootReducer = combineReducers({
  taskReducer,
});
const middleware = [thunk]

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(...middleware)));

export default store;