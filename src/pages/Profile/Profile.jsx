import React, { useEffect, useState } from "react";
import "./Profile.css";
import { MdVerifiedUser } from "react-icons/md";
import { CheckOutlined } from "@ant-design/icons";
import Ripples from "react-ripples";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail, updateUserAvatar } from "../../store/actions/userList";
import moment from "moment";
import { USER_LOGIN_ID } from "../../util/config";
import avtImg from "../../assets/imgs/avtHost.png";

const Profile = (props) => {
  let dispatch = useDispatch();
  let { userLogin } = useSelector((state) => state.userListReducer);
  let [imgSelecting, setImgSelecting] = useState("");
  let [showAvatar, setShowAvatar] = useState(false);
  let [formValue, setFormValue] = useState({
    avatar: {},
  });

  let handleChangeFile = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImgSelecting(e.target.result);
    };
    setFormValue({
      avatar: file,
    });
    setShowAvatar(true);
  };

  useEffect(() => {
    localStorage.getItem(USER_LOGIN_ID) &&
      dispatch(getUserDetail(localStorage.getItem(USER_LOGIN_ID)));
  }, [dispatch]);
  return (
    <div>
      <div className="profile flex gap-12">
        <div className="w-1/3">
          <div
            style={{
              border: "1px solid #DDD",
            }}
            className="rounded-xl px-5"
          >
            <div className="text-center my-5">
              {userLogin?.avatar ? (
                <img
                  className="w-36 h-36 rounded-full mx-auto"
                  src={imgSelecting ? imgSelecting : userLogin?.avatar}
                  alt="avatar"
                />
              ) : (
                <img
                  className="w-36 h-36 rounded-full mx-auto"
                  src={imgSelecting ? imgSelecting : avtImg}
                  alt="avatar"
                />
              )}

              <input
                onChange={handleChangeFile}
                accept="image/jpeg,image/jpg,image/png,image/gif"
                type="file"
                id="avatar"
                name="avatar"
                hidden
              />
              {showAvatar ? (
                <button
                  onClick={() => {
                    console.log(formValue);
                    let formData = new FormData();
                    formData.append("avatar", formValue.avatar);
                    dispatch(updateUserAvatar(formData));
                  }}
                  style={{
                    padding: "5px 9px",
                    color: "black",
                    fontWeight: 500,
                    border: "1px solid #ddd",
                    marginTop: "5px",
                  }}
                  className="hover:bg-gray-300 duration-300"
                >
                  Xác nhận
                </button>
              ) : (
                <label
                  htmlFor="avatar"
                  className="font-semibold underline cursor-pointer"
                >
                  Cập nhật ảnh
                </label>
              )}
            </div>

            <div className="flex items-center gap-3 mb-3">
              <MdVerifiedUser
                className="text-2xl"
                style={{ color: "#1DA7EE" }}
              />
              <span className="text-lg font-bold">Xác minh danh tính</span>
            </div>

            <div className="text-black text-base font-normal mb-3">
              Xác thực danh tính của bạn với huy hiệu xác minh danh tính.
            </div>

            <Ripples
              during={1200}
              className="ripple_btn hover:bg-gray-100 duration-300 mb-10"
            >
              <button
                style={{
                  padding: "10px 18px",
                  width: "100%",
                  color: "black",
                  fontWeight: 500,
                }}
              >
                NHẬN HUY HIỆU
              </button>
            </Ripples>

            <div className="text-xl font-semibold my-3">
              Admin airbnb đã xác nhận
            </div>
            <div className="flex items-center gap-3 text-base font-medium mb-10">
              <CheckOutlined />
              <span>Địa chỉ email</span>
            </div>
          </div>
        </div>
        <div className="w-2/3">
          <div>
            <h3 className="text-3xl font-bold mb-0">
              Xin chào, tôi là {userLogin?.name}
            </h3>
            <div className="text-gray-500 font-semibold my-2">
              Bắt đầu tham gia vào 2021
            </div>
            <p className="text-xl font-bold underline">Thông tin cá nhân</p>
            <div>
              <div className="flex justify-between items-center my-2">
                <span className="font-semibold">Name</span>
                <span className="font-medium text-base">{userLogin?.name}</span>
              </div>
              <hr />
              <div className="flex justify-between items-center my-2">
                <span className="font-semibold">Birthday</span>
                <span className="font-medium text-base">
                  {moment(userLogin?.birthday).format("DD/MM/YYYY")}
                </span>
              </div>
              <hr />
              <div className="flex justify-between items-center my-2">
                <span className="font-semibold">Address</span>
                <span className="font-medium text-base">
                  {userLogin?.address}
                </span>
              </div>
              <hr />
              <div className="flex justify-between items-center my-2">
                <span className="font-semibold">Email</span>
                <span className="font-medium text-base">
                  {userLogin?.email}
                </span>
              </div>
              <hr />
              <div className="flex justify-between items-center my-2">
                <span className="font-semibold">Phone</span>
                <span className="font-medium text-base">
                  {userLogin?.phone}
                </span>
              </div>
              <hr />
              <div className="flex justify-between items-center my-2">
                <span className="font-semibold">Gender</span>
                <span className="font-medium text-base">
                  {userLogin?.gender ? "Nam" : "Nữ"}
                </span>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
