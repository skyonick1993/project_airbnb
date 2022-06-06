import React, { useEffect, useState } from "react";
import "./Header.css";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import {
  DatePicker,
  Divider,
  Drawer,
  Dropdown,
  Select,
  Badge,
  InputNumber,
} from "antd";
import {
  MenuOutlined,
  GlobalOutlined,
  SearchOutlined,
  CloseOutlined,
  CloseCircleOutlined,
  UpOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { getLocationListAction } from "../../store/actions/locationList";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { signInAction, signUpAction } from "../../store/actions/authentication";
import moment from "moment";
import { USER_LOGIN_ID, USER_LOGIN_TOKEN } from "../../util/config";
import { history } from "../../App";
import { getUserDetail } from "../../store/actions/userList";
import avtImg from "../../assets/imgs/avtHost.png";
import createAction from "../../store/actions";
import actionTypes from "../../store/actionTypes";

const { RangePicker } = DatePicker;
const { Option } = Select;

function disabledDate(current) {
  // Can not select days before today
  return moment().add(-1, "days") >= current;
}

const navigation = [
  { name: "Nơi ở", to: "/", current: true },
  { name: "Trải nghiệm", to: "/", current: false },
  { name: "Trải nghiệm trực tuyến", to: "/", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Header = (props) => {
  const [scroll, setScroll] = useState(false);
  const [displaySearchBar, setDisplaySearchBar] = useState(true);
  const homePagePath = props.match.path === "/" || "/home";
  const locationPagePath = props.match.path === "/location/:id";
  const detailPagePath = props.match.path === "/detail/:id";
  const profilePagePath = props.match.path === "/profile/:id";

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scroll]);

  // Display SearchBar
  useEffect(() => {
    if (homePagePath) {
      if (scroll) {
        setDisplaySearchBar(false);
      } else {
        setDisplaySearchBar(true);
      }
    }

    if (locationPagePath || detailPagePath || profilePagePath) {
      setDisplaySearchBar(false);
      setScroll(true);
      const handleScroll = () => {
        setScroll(true);
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [scroll, homePagePath, locationPagePath, detailPagePath, profilePagePath]);

  return (
    <Fragment>
      <div
        style={{ zIndex: 100 }}
        className="fixed text-center justify-center w-full"
      >
        <SubHeader scroll={scroll} />

        {displaySearchBar && <SearchHeader />}
      </div>
    </Fragment>
  );
};

export const SearchHeader = () => {
  const dispatch = useDispatch();
  let { locationList } = useSelector((state) => state.locationListReducer);
  let { bookingDate, days, quantity } = useSelector(
    (state) => state.bookingListReducer
  );
  let [showMenuDropdown, setShowMenuDropdown] = useState(false);

  let formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      locationId: "",
    },
  });

  const handleChangeDate = (moments, value) => {
    if (value[0] === value[1]) return alert("Ngày đến và đi trùng nhau!!!");
    let date1 = new Date(moment(moments[0]).format("MM/DD/YYYY"));
    let date2 = new Date(moment(moments[1]).format("MM/DD/YYYY"));
    let Difference_In_Time = date2.getTime() - date1.getTime();
    let countDay = Difference_In_Time / (1000 * 3600 * 24);
    dispatch(createAction(actionTypes.SET_BOOKING_DATE, moments));
    dispatch(createAction(actionTypes.SET_BOOKING_DAYS, countDay));
  };

  const handleClearDate = () => {
    dispatch(createAction(actionTypes.SET_BOOKING_DATE, ["", ""]));
    dispatch(createAction(actionTypes.SET_BOOKING_DAYS, null));
  };

  const onChangeInputNumber = (name, value) => {
    let cloneQuantity = { ...quantity, [name]: value };
    dispatch(createAction(actionTypes.SET_BOOKING_GUEST, cloneQuantity));
  };

  const onChange = (value) => {
    console.log(value);
    formik.setFieldValue("locationId", value);
  };

  useEffect(() => dispatch(getLocationListAction()), [dispatch]);
  return (
    <div className="text-gray-600 relative flex justify-between px-4 items-center mx-auto py-2 w-2/3 bg-white rounded-full">
      <div className="relative flex items-end h-12 w-1/4">
        <Select
          onChange={onChange}
          name="locationId"
          bordered={false}
          placeholder="Bạn muốn đi đâu?"
          className="text-left"
        >
          {locationList?.map((item, index) => (
            <Option value={item._id} key={index}>
              {item.name}
            </Option>
          ))}
        </Select>
        <label
          htmlFor="name"
          className="absolute pl-1 left-2 top-0.5 text-black font-semibold text-sm"
        >
          Địa điểm:
        </label>
      </div>
      <div className="relative flex items-end h-12 w-1/3">
        <RangePicker
          onChange={handleChangeDate}
          value={[bookingDate.checkIn, bookingDate.checkOut]}
          bordered={false}
          disabledDate={disabledDate}
          allowClear={false}
          suffixIcon={false}
          format="DD/MM/YYYY"
          className="text-left"
          placeholder={["Ngày đến", "Ngày đi"]}
          popupStyle={{ zIndex: 99 }}
        />
        <label
          htmlFor="checkin"
          className="absolute left-2.5 top-0.5 text-black font-semibold text-sm"
        >
          Nhận phòng:
        </label>
        <label
          htmlFor="checkout"
          className="absolute right-14 top-0.5 text-black font-semibold text-sm"
        >
          Trả phòng:
        </label>
        {days && (
          <button
            onClick={handleClearDate}
            style={{
              position: "absolute",
              bottom: "14.5%",
              right: "4.5%",
              color: " #a19c9c",
              fontSize: "16px",
              display: "flex",
            }}
          >
            <CloseCircleOutlined />
          </button>
        )}
      </div>

      <div
        onClick={() => setShowMenuDropdown(!showMenuDropdown)}
        className="relative flex items-center h-12 w-1/3 cursor-pointer"
      >
        <div style={{ paddingLeft: 11, paddingRight: 11, marginTop: 15 }}>
          {quantity.nguoiLon + quantity.treEm + " khách"}
          {quantity.emBe ? ", " + quantity.emBe + " em bé" : ""}
        </div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "30%",
            display: "flex",
            zIndex: 99,
          }}
        >
          {showMenuDropdown ? <UpOutlined /> : <DownOutlined />}
        </div>
        <label
          htmlFor="guest"
          className="absolute left-3 top-0.5 text-black font-semibold text-sm cursor-pointer"
        >
          Thêm khách:
        </label>
      </div>
      {showMenuDropdown && (
        <div className="header__guest__dropdown">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="mb-0 text-base font-medium text-black">
                  Người lớn
                </p>
                <span className="text-gray-600">Từ 13 tuổi trở lên</span>
              </div>
              <div>
                <InputNumber
                  min={1}
                  max={2}
                  defaultValue={1}
                  value={quantity.nguoiLon}
                  onChange={(value) => onChangeInputNumber("nguoiLon", value)}
                  name="nguoiLon"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="mb-0 text-base font-medium text-black">Trẻ em</p>
                <span className="text-gray-600">Độ tuổi 2 - 12</span>
              </div>
              <div>
                <InputNumber
                  min={0}
                  max={2}
                  defaultValue={0}
                  value={quantity.treEm}
                  onChange={(value) => onChangeInputNumber("treEm", value)}
                  name="treEm"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="mb-0 text-base font-medium text-black">Em bé</p>
                <span className="text-gray-600">Dưới 2 tuổi</span>
              </div>
              <div>
                <InputNumber
                  min={0}
                  max={10}
                  defaultValue={0}
                  value={quantity.emBe}
                  onChange={(value) => onChangeInputNumber("emBe", value)}
                  name="emBe"
                />
              </div>
            </div>

            <button
              onClick={() => setShowMenuDropdown(false)}
              className="flex items-center ml-auto text-base font-medium underline hover:bg-gray-100 px-2.5 py-1.5 rounded-md"
              type="button"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      <NavLink
        onClick={() =>
          !formik.values.locationId && alert("Bạn chưa chọn điểm đến!")
        }
        to={`/location/${formik.values.locationId}`}
        className="absolute w-12 h-12 rounded-full bg-pink-600 right-2 top-2 flex items-center cursor-pointer"
      >
        <svg
          className="h-5 w-5 mx-auto text-white fill-current"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 56.966 56.966"
          style={{ enableBackground: "new 0 0 56.966 56.966" }}
          xmlSpace="preserve"
          width="512px"
          height="512px"
        >
          <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
        </svg>
      </NavLink>
    </div>
  );
};

export const SubHeader = (props) => {
  let dispatch = useDispatch();
  let { scroll } = props;
  let [visibleSignIn, setVisibleSignIn] = useState(false);
  let [visibleSignUp, setVisibleSignUp] = useState(false);
  let { userLogin } = useSelector((state) => state.userListReducer);
  let formikSignIn = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "hiep@gmail.com",
      password: "123",
    },
    onSubmit: (values) => {
      dispatch(signInAction(values, setVisibleSignIn));
    },
  });
  let formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
      phone: "",
      birthday: "",
      gender: true,
      address: "",
    },
    onSubmit: (values) => {
      delete values.confirmpassword;
      dispatch(signUpAction(values, setVisibleSignIn, setVisibleSignUp));
    },
  });

  const menu = (
    <div className="header__profile__dropdown">
      {localStorage.getItem(USER_LOGIN_TOKEN) ? (
        <>
          <div className="header__profile__dropdown__item font-semibold">
            Tin nhắn
          </div>
          <div className="header__profile__dropdown__item">
            <Badge dot={true} size="default">
              <span style={{ fontSize: 17 }} className="font-semibold">
                Thông báo
              </span>
            </Badge>
          </div>
          <div className="header__profile__dropdown__item font-semibold">
            Chuyến đi
          </div>
          <div className="header__profile__dropdown__item font-semibold">
            Danh sách yêu thích
          </div>
          <hr
            style={{
              color: "black",
              backgroundColor: "black",
              height: 1,
              marginLeft: "5px",
              marginRight: "5px",
            }}
          />
          <div className="header__profile__dropdown__item font-semibold">
            Quản trị trang
          </div>
          <div className="header__profile__dropdown__item">Cho thuê nhà</div>
          <div className="header__profile__dropdown__item">
            <NavLink
              to={`/profile/${localStorage.getItem(USER_LOGIN_ID)}`}
              className="text-black hover:text-black font-semibold w-full inline-block"
            >
              Tài khoản
            </NavLink>{" "}
          </div>
          <hr
            style={{
              color: "#DDD",
              backgroundColor: "#DDD",
              height: 1,
              marginLeft: "5px",
              marginRight: "5px",
            }}
          />
          <div className="header__profile__dropdown__item">Trải nghiệm</div>
          <div className="header__profile__dropdown__item">Trợ giúp</div>
          <div
            onClick={() => {
              localStorage.clear();
              history.push("/");
              window.location.reload();
            }}
            className="header__profile__dropdown__item font-semibold"
          >
            Đăng xuất
          </div>{" "}
        </>
      ) : (
        <>
          <div
            onClick={() => setVisibleSignUp(true)}
            className="header__profile__dropdown__item font-semibold"
          >
            Đăng ký
          </div>
          <div
            onClick={() => setVisibleSignIn(true)}
            className="header__profile__dropdown__item"
          >
            Đăng nhập
          </div>
          <hr
            style={{
              color: "black",
              backgroundColor: "black",
              height: 1,
              marginLeft: "5px",
              marginRight: "5px",
            }}
          />
          <div className="header__profile__dropdown__item">Cho thuê nhà</div>
          <div className="header__profile__dropdown__item">
            Tổ chức trải nghiệm
          </div>
          <div className="header__profile__dropdown__item">Trải nghiệm</div>{" "}
        </>
      )}
    </div>
  );

  useEffect(() => {
    localStorage.getItem(USER_LOGIN_ID) &&
      dispatch(getUserDetail(localStorage.getItem(USER_LOGIN_ID)));
  }, [dispatch]);

  return (
    <div
      style={{ background: `${scroll ? "#fff" : "transparent"}` }}
      className="header"
    >
      <div className="header__left">
        <button
          onClick={() => {
            history.push("/");
            window.scrollTo({ top: 0, left: 0 });
            window.location.reload();
          }}
        >
          <div
            style={{ color: `${scroll ? "#FF385C" : "#fff"}` }}
            className="header__logo flex items-center"
          >
            <svg
              width={102}
              height={32}
              fill="currentcolor"
              style={{ display: "block" }}
            >
              <path d="M29.24 22.68c-.16-.39-.31-.8-.47-1.15l-.74-1.67-.03-.03c-2.2-4.8-4.55-9.68-7.04-14.48l-.1-.2c-.25-.47-.5-.99-.76-1.47-.32-.57-.63-1.18-1.14-1.76a5.3 5.3 0 00-8.2 0c-.47.58-.82 1.19-1.14 1.76-.25.52-.5 1.03-.76 1.5l-.1.2c-2.45 4.8-4.84 9.68-7.04 14.48l-.06.06c-.22.52-.48 1.06-.73 1.64-.16.35-.32.73-.48 1.15a6.8 6.8 0 007.2 9.23 8.38 8.38 0 003.18-1.1c1.3-.73 2.55-1.79 3.95-3.32 1.4 1.53 2.68 2.59 3.95 3.33A8.38 8.38 0 0022.75 32a6.79 6.79 0 006.75-5.83 5.94 5.94 0 00-.26-3.5zm-14.36 1.66c-1.72-2.2-2.84-4.22-3.22-5.95a5.2 5.2 0 01-.1-1.96c.07-.51.26-.96.52-1.34.6-.87 1.65-1.41 2.8-1.41a3.3 3.3 0 012.8 1.4c.26.4.45.84.51 1.35.1.58.06 1.25-.1 1.96-.38 1.7-1.5 3.74-3.21 5.95zm12.74 1.48a4.76 4.76 0 01-2.9 3.75c-.76.32-1.6.41-2.42.32-.8-.1-1.6-.36-2.42-.84a15.64 15.64 0 01-3.63-3.1c2.1-2.6 3.37-4.97 3.85-7.08.23-1 .26-1.9.16-2.73a5.53 5.53 0 00-.86-2.2 5.36 5.36 0 00-4.49-2.28c-1.85 0-3.5.86-4.5 2.27a5.18 5.18 0 00-.85 2.21c-.13.84-.1 1.77.16 2.73.48 2.11 1.78 4.51 3.85 7.1a14.33 14.33 0 01-3.63 3.12c-.83.48-1.62.73-2.42.83a4.76 4.76 0 01-5.32-4.07c-.1-.8-.03-1.6.29-2.5.1-.32.25-.64.41-1.02.22-.52.48-1.06.73-1.6l.04-.07c2.16-4.77 4.52-9.64 6.97-14.41l.1-.2c.25-.48.5-.99.76-1.47.26-.51.54-1 .9-1.4a3.32 3.32 0 015.09 0c.35.4.64.89.9 1.4.25.48.5 1 .76 1.47l.1.2c2.44 4.77 4.8 9.64 7 14.41l.03.03c.26.52.48 1.1.73 1.6.16.39.32.7.42 1.03.19.9.29 1.7.19 2.5zM41.54 24.12a5.02 5.02 0 01-3.95-1.83 6.55 6.55 0 01-1.6-4.48 6.96 6.96 0 011.66-4.58 5.3 5.3 0 014.08-1.86 4.3 4.3 0 013.7 1.92l.1-1.57h2.92V23.8h-2.93l-.1-1.76a4.52 4.52 0 01-3.88 2.08zm.76-2.88c.58 0 1.09-.16 1.57-.45.44-.32.8-.74 1.08-1.25.25-.51.38-1.12.38-1.8a3.42 3.42 0 00-1.47-3.04 2.95 2.95 0 00-3.12 0c-.44.32-.8.74-1.08 1.25a4.01 4.01 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.98.45 1.55.45zM53.45 8.46c0 .35-.06.67-.22.93-.16.25-.38.48-.67.64-.29.16-.6.22-.92.22-.32 0-.64-.06-.93-.22a1.84 1.84 0 01-.67-.64 1.82 1.82 0 01-.22-.93c0-.36.07-.68.22-.93.16-.3.39-.48.67-.64.29-.16.6-.23.93-.23a1.84 1.84 0 011.6.86 2 2 0 01.21.94zm-3.4 15.3V11.7h3.18v12.08h-3.19zm11.68-8.9v.04c-.15-.07-.35-.1-.5-.13-.2-.04-.36-.04-.55-.04-.89 0-1.56.26-2 .8-.48.55-.7 1.32-.7 2.31v5.93h-3.19V11.69h2.93l.1 1.83c.32-.64.7-1.12 1.24-1.48a3.1 3.1 0 011.81-.5c.23 0 .45.02.64.06.1.03.16.03.22.06v3.2zm1.28 8.9V6.74h3.18v6.5c.45-.58.96-1.03 1.6-1.38a5.02 5.02 0 016.08 1.31 6.55 6.55 0 011.6 4.49 6.96 6.96 0 01-1.66 4.58 5.3 5.3 0 01-4.08 1.86 4.3 4.3 0 01-3.7-1.92l-.1 1.57-2.92.03zm6.15-2.52c.57 0 1.08-.16 1.56-.45.44-.32.8-.74 1.08-1.25.26-.51.38-1.12.38-1.8 0-.67-.12-1.28-.38-1.79a3.75 3.75 0 00-1.08-1.25 2.95 2.95 0 00-3.12 0c-.45.32-.8.74-1.09 1.25a4.01 4.01 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.98.45 1.56.45zm7.51 2.53V11.69h2.93l.1 1.57a3.96 3.96 0 013.54-1.89 4.1 4.1 0 013.82 2.44c.35.76.54 1.7.54 2.75v7.24h-3.19v-6.82c0-.84-.19-1.5-.57-1.99-.38-.48-.9-.74-1.56-.74-.48 0-.9.1-1.27.32-.35.23-.64.52-.86.93a2.7 2.7 0 00-.32 1.35v6.92h-3.16zm12.52 0V6.73h3.19v6.5a4.67 4.67 0 013.73-1.89 5.02 5.02 0 013.95 1.83 6.57 6.57 0 011.59 4.48 6.95 6.95 0 01-1.66 4.58 5.3 5.3 0 01-4.08 1.86 4.3 4.3 0 01-3.7-1.92l-.09 1.57-2.93.03zm6.18-2.53c.58 0 1.09-.16 1.56-.45.45-.32.8-.74 1.09-1.25.25-.51.38-1.12.38-1.8a3.42 3.42 0 00-1.47-3.04 2.95 2.95 0 00-3.12 0c-.44.32-.8.74-1.08 1.25a3.63 3.63 0 00-.38 1.8 3.42 3.42 0 001.47 3.04c.47.29.95.45 1.55.45z" />
            </svg>
          </div>
        </button>
      </div>

      {scroll ? (
        <div className="header__center">
          <input type="text" placeholder="Bắt đầu tìm kiếm" />
          <button
            style={{ backgroundColor: "#FF385C" }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-base"
          >
            <SearchOutlined />
          </button>
        </div>
      ) : (
        <div className="hidden sm:block sm:mx-auto">
          <div className="flex">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={classNames(
                  item.current
                    ? "text-white hover:text-gray-300 border-b-2 border-white"
                    : "text-white  hover:text-gray-300",
                  "px-3 py-2 text-center text-base font-normal"
                )}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}

      <div className="header__right">
        <button className="bg-transparent px-3.5 hover:bg-gray-300 duration-300 hover:bg-opacity-25 rounded-full h-9 flex justify-center items-center">
          <span
            className={`${scroll ? "text-black" : "text-white"} font-medium`}
          >
            Trở thành chủ nhà
          </span>
        </button>
        <button className="bg-transparent hover:bg-gray-300 duration-300 hover:bg-opacity-25 rounded-full h-10 w-10 flex justify-center items-center">
          <GlobalOutlined
            style={{ color: `${scroll ? "black" : "white"}` }}
            className="text-lg flex"
          />
        </button>
        <Dropdown
          overlay={menu}
          trigger={["click"]}
          placement="bottomRight"
          overlayStyle={{
            zIndex: 999,
          }}
        >
          <div
            style={{ border: "1px solid #DDD", background: "#fff" }}
            className="w-20 h-10 px-1 ml-3 cursor-pointer hover:shadow-lg flex justify-between items-center text-sm rounded-full"
          >
            <MenuOutlined className="ml-2.5" />
            {localStorage.getItem(USER_LOGIN_TOKEN) ? (
              <Badge count={1}>
                <img
                  className="h-8 w-8 rounded-full bg-transparent"
                  src={userLogin?.avatar ? userLogin?.avatar : avtImg}
                  alt="avatar"
                />
              </Badge>
            ) : (
              <svg className="h-8 w-8 rounded-full bg-transparent">
                <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
              </svg>
            )}
          </div>
        </Dropdown>
        <Drawer
          title={
            <div className="flex justify-center ">
              <button
                onClick={() => setVisibleSignIn(false)}
                className="absolute top-2.5 left-2.5 hover:bg-gray-100 rounded-full px-2 py-2 flex justify-center items-center"
              >
                <CloseOutlined className="text-lg flex" />
              </button>
              <span className="font-bold">Chào mừng bạn đến với Airbnb</span>
            </div>
          }
          headerStyle={{ position: "relative" }}
          placement="bottom"
          visible={visibleSignIn}
          onClose={() => setVisibleSignIn(false)}
          zIndex={999}
          closeIcon={false}
          contentWrapperStyle={{
            width: "45%",
            height: "90%",
            bottom: "unset",
            borderRadius: 12,
            overflow: "hidden",
          }}
          className="flex justify-center items-center"
        >
          <form
            onSubmit={formikSignIn.handleSubmit}
            className="flex w-full items-start"
          >
            <div className="flex w-full flex-col">
              <h3 className="text-2xl font-semibold mb-4">Đăng Nhập</h3>
              <div className="relative h-12 mb-5">
                <input
                  onChange={(e) =>
                    formikSignIn.setFieldValue("email", e.target.value)
                  }
                  value={formikSignIn.values.email}
                  type="text"
                  name="email"
                  className={`${
                    formikSignIn.values.email && "header__login__focusInput"
                  } header__login__input h-full w-full border-gray-300 px-2 transition-all rounded-md`}
                />
                <label
                  htmlFor="email"
                  className={`${
                    formikSignIn.values.email && "header__login__focusLabel"
                  } header__login__label absolute left-2 transition-all bg-white px-1`}
                >
                  Email
                </label>
              </div>

              <div className="relative h-12 mb-3">
                <input
                  onChange={(e) =>
                    formikSignIn.setFieldValue("password", e.target.value)
                  }
                  value={formikSignIn.values.password}
                  type="password"
                  name="password"
                  className={`${
                    formikSignIn.values.password && "header__login__focusInput"
                  } header__login__input h-full w-full border-gray-300 px-2 transition-all rounded-md`}
                />
                <label
                  htmlFor="password"
                  className={`${
                    formikSignIn.values.password && "header__login__focusLabel"
                  } header__login__label absolute left-2 transition-all bg-white px-1`}
                >
                  Password
                </label>
              </div>

              <div>
                <span className="cursor-pointer text-black hover:text-gray-500 hover:underline">
                  Forgot password?
                </span>
              </div>

              <div className="mt-2">
                <button type="submit" className="header__login__btn">
                  TIẾP TỤC
                </button>
              </div>

              <Divider
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  borderTopColor: "rgb(0 0 0 / 18%)",
                }}
              >
                hoặc
              </Divider>

              <div className="flex items-center cursor-pointer rounded-md border-2 border-gray-300 hover:border-black px-2 py-2.5 mb-5">
                <div>
                  <BsFacebook
                    className="text-xl"
                    style={{ color: "rgb(24, 119, 242)" }}
                  />
                </div>
                <div className="flex justify-center items-center w-full font-semibold">
                  <span>Tiếp tục với Facebook</span>
                </div>
              </div>

              <div className="flex items-center cursor-pointer rounded-md border-2 border-gray-300 hover:border-black px-2 py-2.5 mb-5">
                <div>
                  <FcGoogle className="text-xl" />
                </div>
                <div className="flex justify-center items-center w-full font-semibold">
                  <span>Tiếp tục với Google</span>
                </div>
              </div>

              <div className="flex justify-center items-center w-full font-semibold">
                <span>
                  Don't have an account?{" "}
                  <button
                    onClick={() => {
                      setVisibleSignIn(false);
                      setVisibleSignUp(true);
                    }}
                    className="font-semibold text-blue-600"
                    type="button"
                  >
                    Sign Up
                  </button>
                </span>
              </div>
            </div>
          </form>
        </Drawer>
        <Drawer
          title={
            <div className="flex justify-center ">
              <button
                onClick={() => setVisibleSignUp(false)}
                className="absolute top-2.5 left-2.5 hover:bg-gray-100 rounded-full px-2 py-2 flex justify-center items-center"
              >
                <CloseOutlined className="text-lg flex" />
              </button>
              <span className="font-bold">Chào mừng bạn đến với Airbnb</span>
            </div>
          }
          headerStyle={{ position: "relative" }}
          placement="bottom"
          visible={visibleSignUp}
          onClose={() => setVisibleSignUp(false)}
          zIndex={999}
          closeIcon={false}
          contentWrapperStyle={{
            width: "45%",
            height: "90%",
            bottom: "unset",
            borderRadius: 12,
            overflow: "hidden",
          }}
          className="flex justify-center items-center"
        >
          <form
            onSubmit={formik.handleSubmit}
            className="flex w-full items-start"
          >
            <div className="flex w-full flex-col">
              <h3 className="text-2xl font-semibold mb-4">Đăng Ký</h3>
              <div className="relative h-12 mb-5">
                <input
                  onChange={(e) => {
                    formik.setFieldValue("email", e.target.value);
                  }}
                  value={formik.values.email}
                  type="email"
                  name="email"
                  className={`${
                    formik.values.email && "header__login__focusInput"
                  } header__login__input h-full w-full border-gray-300 px-2 transition-all rounded-md`}
                />
                <label
                  htmlFor="email"
                  className={`${
                    formik.values.email && "header__login__focusLabel"
                  } header__login__label absolute left-2 transition-all bg-white px-1`}
                >
                  Email
                </label>
              </div>

              <div className="relative h-12 mb-5">
                <input
                  onChange={(e) =>
                    formik.setFieldValue("password", e.target.value)
                  }
                  value={formik.values.password}
                  type="password"
                  name="password"
                  className={`${
                    formik.values.password && "header__login__focusInput"
                  } header__login__input h-full w-full border-gray-300 px-2 transition-all rounded-md`}
                />
                <label
                  htmlFor="password"
                  className={`${
                    formik.values.password && "header__login__focusLabel"
                  } header__login__label absolute left-2 transition-all bg-white px-1`}
                >
                  Password
                </label>
              </div>

              <div className="relative h-12 mb-5">
                <input
                  onChange={(e) =>
                    formik.setFieldValue("confirmpassword", e.target.value)
                  }
                  value={formik.values.confirmpassword}
                  type="password"
                  name="confirmpassword"
                  className={`${
                    formik.values.confirmpassword && "header__login__focusInput"
                  } header__login__input h-full w-full border-gray-300 px-2 transition-all rounded-md`}
                />
                <label
                  htmlFor="confirmpassword"
                  className={`${
                    formik.values.confirmpassword && "header__login__focusLabel"
                  } header__login__label absolute left-2 transition-all bg-white px-1`}
                >
                  Confirm Password
                </label>
              </div>

              <div className="relative h-12 mb-3">
                <input
                  onChange={(e) => formik.setFieldValue("name", e.target.value)}
                  value={formik.values.name}
                  type="text"
                  name="name"
                  className={`${
                    formik.values.name && "header__login__focusInput"
                  } header__login__input h-full w-full border-gray-300 px-2 transition-all rounded-md`}
                />
                <label
                  htmlFor="fullname"
                  className={`${
                    formik.values.name && "header__login__focusLabel"
                  } header__login__label absolute left-2 transition-all bg-white px-1`}
                >
                  Full Name
                </label>
              </div>

              <div className="relative h-12 mb-5">
                <input
                  onChange={(e) =>
                    formik.setFieldValue("phone", e.target.value)
                  }
                  value={formik.values.phone}
                  type="text"
                  name="phone"
                  className={`${
                    formik.values.phone && "header__login__focusInput"
                  } header__login__input h-full w-full border-gray-300 px-2 transition-all rounded-md`}
                />
                <label
                  htmlFor="phone"
                  className={`${
                    formik.values.phone && "header__login__focusLabel"
                  } header__login__label absolute left-2 transition-all bg-white px-1`}
                >
                  Phone
                </label>
              </div>

              <div
                className={`relative h-12 mb-5 ${
                  formik.values.birthday && "header__login__focusInput"
                } header__login__input w-full border-gray-300 px-2 transition-all rounded-md`}
                name="birthday"
              >
                <DatePicker
                  onChange={(moments, date) =>
                    formik.setFieldValue(
                      "birthday",
                      moment(moments).format("YYYY/MM/DD")
                    )
                  }
                  name="birthday"
                  format="DD/MM/YYYY"
                  placeholder="DD/MM/YYYY"
                  bordered={false}
                  showToday={false}
                  className="w-full h-full"
                  style={{ padding: 0 }}
                  popupStyle={{ zIndex: 9999 }}
                />
                <label
                  htmlFor="birthday"
                  className={`${
                    formik.values.birthday && "header__login__focusLabel"
                  } header__login__labelBirthday absolute left-2 transition-all bg-white px-1`}
                >
                  Birthday
                </label>
              </div>

              <div className="flex gap-5 mb-5">
                <span className="text-base text-gray-500 font-normal">
                  Gender :
                </span>

                <div className="flex items-end">
                  <input
                    onChange={() => formik.setFieldValue("gender", true)}
                    id="male"
                    type="radio"
                    name="gender"
                    className="hidden"
                    defaultChecked
                  />
                  <label
                    htmlFor="male"
                    className="flex items-center cursor-pointer text-base font-medium"
                  >
                    <span className="w-4 h-4 inline-block mr-1 rounded-full border border-grey" />
                    Male
                  </label>
                </div>

                <div className="flex items-end">
                  <input
                    onChange={() => formik.setFieldValue("gender", false)}
                    id="female"
                    type="radio"
                    name="gender"
                    className="hidden female"
                  />
                  <label
                    htmlFor="female"
                    className="flex items-center cursor-pointer text-base font-medium"
                  >
                    <span className="w-4 h-4 inline-block mr-1 rounded-full border border-grey" />
                    Female
                  </label>
                </div>
              </div>

              <div className="relative h-12 mb-5">
                <input
                  onChange={(e) =>
                    formik.setFieldValue("address", e.target.value)
                  }
                  value={formik.values.address}
                  type="text"
                  name="address"
                  className={`${
                    formik.values.address && "header__login__focusInput"
                  } header__login__input h-full w-full border-gray-300 px-2 transition-all rounded-md`}
                />
                <label
                  htmlFor="address"
                  className={`${
                    formik.values.address && "header__login__focusLabel"
                  } header__login__label absolute left-2 transition-all bg-white px-1`}
                >
                  Address
                </label>
              </div>

              <div className="my-2">
                <button type="submit" className="header__login__btn">
                  TIẾP TỤC
                </button>
              </div>

              <div className="flex justify-center items-center w-full font-semibold">
                <span>
                  Already have an account?{" "}
                  <button
                    onClick={() => {
                      setVisibleSignUp(false);
                      setVisibleSignIn(true);
                    }}
                    type="button"
                    className="font-semibold text-blue-600"
                  >
                    Log in Here
                  </button>
                </span>
              </div>
            </div>
          </form>
        </Drawer>
      </div>
    </div>
  );
};
