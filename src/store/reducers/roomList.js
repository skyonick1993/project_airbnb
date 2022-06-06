import actionTypes from "../actionTypes";

let initialState = {
  roomList: [],
  roomDetail: {},
};

const roomListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.GET_ROOMLIST:
      state.roomList = payload;
      return { ...state };
    case actionTypes.GET_ROOM_DETAIL:
      state.roomDetail = payload;
      return { ...state };
    default:
      return state;
  }
};

export default roomListReducer;
