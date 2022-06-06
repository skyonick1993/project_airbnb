import actionTypes from "../actionTypes";

const initialState = {
  locationList: [],
};

const locationListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.GET_LOCATIONLIST:
      state.locationList = payload;
      return { ...state };

    default:
      return { ...state };
  }
};

export default locationListReducer;
