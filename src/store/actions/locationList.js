import createAction from ".";
import quanLyViTri from "../../services/QuanLyViTri";
import actionTypes from "../actionTypes";

export const getLocationListAction = () => {
  return async (dispatch) => {
    try {
      let res = await quanLyViTri.layDsViTri();
      dispatch(createAction(actionTypes.GET_LOCATIONLIST, res.data));
    } catch (err) {
      console.log(err.response);
    }
  };
};
