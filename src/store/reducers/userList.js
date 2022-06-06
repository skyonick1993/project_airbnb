import actionTypes from "../actionTypes";

let inititalState = {
  userLogin: {},
};

const userListReducer = (state = inititalState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_USER_LOGIN:
      state.userLogin = payload;
      return { ...state };
    default:
      return state;
  }
};

export default userListReducer;
