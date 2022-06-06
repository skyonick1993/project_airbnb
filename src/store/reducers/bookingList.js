import actionTypes from "../actionTypes";

let initialState = {
  bookingDate: {
    checkIn: "",
    checkOut: "",
  },
  quantity: {
    nguoiLon: 1,
    treEm: 0,
    emBe: 0,
  },
  days: null,
};

const bookingListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_BOOKING_DATE:
      state.bookingDate = {
        checkIn: payload[0],
        checkOut: payload[1],
      };
      return { ...state };
    case actionTypes.SET_BOOKING_DAYS:
      state.days = payload;
      return { ...state };
    case actionTypes.SET_BOOKING_GUEST:
      state.quantity = payload;
      return { ...state };

    default:
      return state;
  }
};

export default bookingListReducer;
