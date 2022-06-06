import createAction from ".";
import quanLyDanhGia from "../../services/QuanLyDanhGia";
import quanLyPhong from "../../services/QuanLyPhong";
import actionTypes from "../actionTypes";
import { message } from "antd";

const success = (text) => {
  message.success({
    content: text,
    className: "success_message",
  });
};

const error = (text) => {
  message.error({
    content: text,
    className: "error_message",
  });
};

export const getRoomListAction = (locationId) => {
  return async (dispatch) => {
    try {
      let res = await quanLyPhong.layDsPhong(locationId);
      dispatch(createAction(actionTypes.GET_ROOMLIST, res.data));
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const getRoomDetailAction = (roomId) => {
  return async (dispatch) => {
    try {
      let res = await quanLyPhong.layThongTinChiTietPhong(roomId);
      dispatch(createAction(actionTypes.GET_ROOM_DETAIL, res.data));
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const getReviewListAction = (roomId) => {
  return async (dispatch) => {
    try {
      let res = await quanLyDanhGia.layDsDanhGia(roomId);
      dispatch(createAction(actionTypes.GET_REVIEW_LIST, res.data));
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const postBookingRoomAction = (bookingForm) => {
  return async (dispatch) => {
    try {
      let res = await quanLyPhong.datPhong(bookingForm);
      console.log("Đặt phòng thành công!!!", res.data);
      success(res.data.message);
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      console.log(err.response);
      error(err.response.data.message);
    }
  };
};
