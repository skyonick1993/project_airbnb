import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import locationListReducer from "./reducers/locationList";
import roomListReducer from "./reducers/roomList";
import reviewListReducer from "./reducers/reviewList";
import bookingListReducer from "./reducers/bookingList";
import userListReducer from "./reducers/userList";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  locationListReducer,
  roomListReducer,
  reviewListReducer,
  bookingListReducer,
  userListReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
