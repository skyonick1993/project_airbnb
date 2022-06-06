import actionTypes from "../actionTypes";

let initialState = {
  reviewList: [],
};

const reviewListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.GET_REVIEW_LIST:
      state.reviewList = payload;
      return { ...state };
    default:
      return state;
  }
};

export default reviewListReducer;
