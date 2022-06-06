import createAction from ".";
import quanLyUser from "../../services/QuanLyUser";
import actionTypes from "../actionTypes";
import { message } from "antd";

const success = () => {
  message.success({
    content: "Cập nhật avatar thành công!",
    className: "success_message",
  });
};

const error = (text) => {
  message.error({
    content: text,
    className: "error_message",
  });
};

export const getUserDetail = (userId) => {
  return async (dispatch) => {
    try {
      let res = await quanLyUser.layThongTinChiTietUser(userId);
      dispatch(createAction(actionTypes.SET_USER_LOGIN, res.data));
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const updateUserAvatar = (formData) => {
  return async (dispatch) => {
    try {
      let res = await quanLyUser.capNhatAvatarUser(formData);
      console.log(res.data);
      success();
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      console.log(err.response.data.message);
      error(err.response.data.message);
    }
  };
};
