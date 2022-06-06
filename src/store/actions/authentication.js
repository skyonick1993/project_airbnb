import createAction from ".";
import xacThucUser from "../../services/XacThucUser";
import { USER_LOGIN_ID, USER_LOGIN_TOKEN } from "../../util/config";
import actionTypes from "../actionTypes";
import "./authStyle.css";
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

export const signUpAction = (formValue, setVisibleSignIn, setVisibleSignUp) => {
  return async (dispatch) => {
    try {
      let res = await xacThucUser.dangKy(formValue);
      console.log(res.data);
      success("Đăng ký thành công!");
      setVisibleSignUp(false);
      setVisibleSignIn(true);
    } catch (err) {
      console.log(err.response);
      error("Đăng ký không thành công!");
    }
  };
};

export const signInAction = (formValue, setVisibleSignIn) => {
  return async (dispatch) => {
    try {
      let res = await xacThucUser.dangNhap(formValue);
      console.log(res.data);
      localStorage.setItem(USER_LOGIN_TOKEN, res.data.token);
      localStorage.setItem(USER_LOGIN_ID, res.data.user._id);
      dispatch(createAction(actionTypes.SET_USER_LOGIN, res.data.user));
      success("Đăng nhập thành công!");
      setVisibleSignIn(false);
    } catch (err) {
      console.log(err.response);
      error(err.response.data.message);
    }
  };
};
