import { createStore, combineReducers } from "redux";
import Student from './studentSlice';

const rootReducer = combineReducers({student: Student});
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
