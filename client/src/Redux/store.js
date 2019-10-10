import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Login from "./Reducers/Login";
import Facility from "./Reducers/facility";
import Transport from "./Reducers/transport";
import Foods from "./Reducers/foods";
import Order from "./Reducers/order";
import Category from "./Reducers/categoryReducer"



const store = createStore(
  combineReducers({
    Login,
    Facility,
    Transport,
    Foods,
    Order,
    Category
  }),
  applyMiddleware(thunk)
);

export default store;
