import {
  CheckCircleTwoTone,
  ClearOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  DownOutlined,
  HeartOutlined,
  HomeOutlined,
  KeyOutlined,
  LeftOutlined,
  MenuOutlined,
  RightOutlined,
  SearchOutlined,
  StarFilled,
  SwapRightOutlined,
  TranslationOutlined,
  UploadOutlined,
  UpOutlined,
  WifiOutlined,
} from "@ant-design/icons";
import {
  GiFireplace,
  GiForkKnifeSpoon,
  GiGasMask,
  GiPartyFlags,
  GiPhotoCamera,
  GiSmokeBomb,
  GiWashingMachine,
} from "react-icons/gi";
import { BiTv } from "react-icons/bi";
import { CgGym } from "react-icons/cg";
import {
  MdOutlineDryCleaning,
  MdOutlineElevator,
  MdOutlinePets,
  MdOutlineSmokeFree,
  MdVerifiedUser,
} from "react-icons/md";
import {
  FaHandHoldingWater,
  FaHotTub,
  FaMoneyCheckAlt,
  FaSwimmer,
} from "react-icons/fa";
import { RiMedalFill } from "react-icons/ri";
import { AiFillClockCircle } from "react-icons/ai";
import { BsFillDoorOpenFill, BsStars } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import "./Detail.css";
import moment from "moment";
import { DatePicker, InputNumber, Progress } from "antd";
import { useDispatch } from "react-redux";
import {
  getReviewListAction,
  getRoomDetailAction,
  postBookingRoomAction,
} from "../../store/actions/roomList";
import { useSelector } from "react-redux";
import createAction from "../../store/actions";
import actionTypes from "../../store/actionTypes";
import { Drawer } from "antd";
import avtHost from "../../assets/imgs/avtHost.png";
import { USER_LOGIN_TOKEN } from "../../util/config";

const { RangePicker } = DatePicker;

function disabledDate(current) {
  // Can not select days before today
  return moment().add(-1, "days") >= current;
}

const Detail = (props) => {
  const dispatch = useDispatch();
  let [showMenuDropdown, setShowMenuDropdown] = useState(false);
  let [visible, setVisible] = useState(false);
  let [visibleRating, setVisibleRating] = useState(false);
  let [visibleBooking, setVisibleBooking] = useState(false);
  let [payment, setPayment] = useState(false);
  let { roomDetail } = useSelector((state) => state.roomListReducer);
  let { reviewList } = useSelector((state) => state.reviewListReducer);
  let { bookingDate, days, quantity } = useSelector(
    (state) => state.bookingListReducer
  );
  let date = new Date();

  const showDrawer = () => {
    setVisible(true);
  };

  const showDrawerRating = () => {
    setVisibleRating(true);
  };

  let calcSum = {
    tienPhong: roomDetail?.price * days,
    phiVeSinh: 220000,
    phiDichVu: 0,
    total: roomDetail?.price * days + 220000,
  };

  const onChangeInputNumber = (name, value) => {
    let cloneQuantity = { ...quantity, [name]: value };
    dispatch(createAction(actionTypes.SET_BOOKING_GUEST, cloneQuantity));
  };

  const handleClearDate = () => {
    dispatch(createAction(actionTypes.SET_BOOKING_DATE, ["", ""]));
    dispatch(createAction(actionTypes.SET_BOOKING_DAYS, null));
  };

  const handleChangeDate = (moments, value) => {
    if (value[0] === value[1]) return alert("Ngày đến và đi trùng nhau!!!");
    let date1 = new Date(moment(moments[0]).format("MM/DD/YYYY"));
    let date2 = new Date(moment(moments[1]).format("MM/DD/YYYY"));
    let Difference_In_Time = date2.getTime() - date1.getTime();
    let countDay = Difference_In_Time / (1000 * 3600 * 24);
    dispatch(createAction(actionTypes.SET_BOOKING_DATE, moments));
    dispatch(createAction(actionTypes.SET_BOOKING_DAYS, countDay));
  };

  const handleBooking = () => {
    let bookingForm = { ...bookingDate, roomId: roomDetail._id };
    console.log(bookingForm);
    dispatch(postBookingRoomAction(bookingForm));
  };

  useEffect(() => {
    dispatch(getRoomDetailAction(props.match.params.id));
    dispatch(getReviewListAction(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  return (
    <div className="container">
      <div>
        <div>
          <h3 className="text-2xl font-bold">
            ⭐ {roomDetail?.name} - {roomDetail?.locationId?.name} ❤️
          </h3>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center gap-1">
            <StarFilled className="text-base flex" style={{ color: "red" }} />
            <span className="font-semibold">
              {roomDetail?.locationId?.valueate / 2}
            </span>
            <span className="text-gray-500 font-medium underline">
              ({roomDetail?.locationId?.valueate * 8} đánh giá)
            </span>{" "}
            ·{" "}
            <span className="text-gray-500 font-medium underline">
              {roomDetail?.locationId?.name}, {roomDetail?.locationId?.province}
              , {roomDetail?.locationId?.country?.toUpperCase()}
            </span>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md px-2 py-1.5">
              <UploadOutlined className="text-base flex" />{" "}
              <span className=" font-semibold underline">Chia sẻ</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md px-2 py-1.5">
              <HeartOutlined className="text-base flex" />{" "}
              <span className=" font-semibold underline">Lưu</span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative grid grid-cols-2 gap-2 mx-auto pt-5 md:grid-cols-4">
        <div
          onClick={showDrawer}
          className="w-full h-full relative overflow-hidden rounded-l-xl col-span-2 row-span-2 min-h-96 md:col-start-1 md:row-start-1 "
        >
          <img
            src={roomDetail?.image}
            alt={roomDetail?.name}
            className="w-full h-full"
          />
          <div className="detail__img__cover"></div>
        </div>
        <div
          onClick={showDrawer}
          className="w-full h-full min-h-48 relative overflow-hidden"
        >
          <img
            alt={roomDetail?.name}
            className="w-full h-full"
            src={roomDetail?.image}
          />
          <div className="detail__img__cover"></div>
        </div>
        <div
          onClick={showDrawer}
          className="w-full h-full min-h-48 relative overflow-hidden rounded-tr-xl"
        >
          <img
            alt={roomDetail?.name}
            className="w-full h-full"
            src={roomDetail?.image}
          />
          <div className="detail__img__cover"></div>
        </div>
        <div
          onClick={showDrawer}
          className="w-full h-full min-h-48 relative overflow-hidden"
        >
          <img
            alt={roomDetail?.name}
            className="w-full h-full"
            src={roomDetail?.image}
          />
          <div className="detail__img__cover"></div>
        </div>
        <div
          onClick={showDrawer}
          className="w-full h-full min-h-48 relative overflow-hidden rounded-br-xl"
        >
          <img
            alt={roomDetail?.name}
            className="w-full h-full"
            src={roomDetail?.image}
          />
          <div className="detail__img__cover"></div>
        </div>
        <div
          onClick={showDrawer}
          style={{ border: "1px solid black" }}
          className="absolute cursor-pointer right-5 bottom-5 flex items-center gap-2 bg-white rounded-md px-3 py-2"
        >
          <div className="flex items-center font-bold">
            <MenuOutlined />
          </div>
          <span className="font-bold">Hiển thị tất cả ảnh</span>
        </div>
      </div>
      <Drawer
        placement={"bottom"}
        height={"100%"}
        visible={visible}
        zIndex={999}
        closable={false}
        onClose={() => setVisible(false)}
      >
        <button className="absolute" onClick={() => setVisible(false)}>
          <LeftOutlined className="text-lg hover:brightness-150 duration-300" />
        </button>
        <div className="detail__showImg flex flex-wrap gap-3">
          <img
            alt={roomDetail?.name}
            src={roomDetail?.image}
            className="w-full h-full"
          />
          <div className="flex gap-3 w-full">
            <img
              alt={roomDetail?.name}
              src={roomDetail?.image}
              className="w-full"
            />
            <img
              alt={roomDetail?.name}
              src={roomDetail?.image}
              className="w-full"
            />
          </div>
          <img
            alt={roomDetail?.name}
            src={roomDetail?.image}
            className="w-full h-full"
          />
          <div className="flex gap-3 w-full">
            <img
              alt={roomDetail?.name}
              src={roomDetail?.image}
              className="w-full"
            />
            <img
              alt={roomDetail?.name}
              src={roomDetail?.image}
              className="w-full"
            />
          </div>
          <img
            alt={roomDetail?.name}
            src={roomDetail?.image}
            className="w-full h-full"
          />
          <div className="flex gap-3 w-full">
            <img
              alt={roomDetail?.name}
              src={roomDetail?.image}
              className="w-full"
            />
            <img
              alt={roomDetail?.name}
              src={roomDetail?.image}
              className="w-full"
            />
          </div>
        </div>
      </Drawer>

      <div className="flex pt-5 pb-10 ">
        <div className="w-7/12">
          <div className="flex justify-between py-5">
            <div>
              <h3 className="text-2xl mb-1">
                Toàn bộ căn hộ cho thuê. Chủ nhà Hiệp Nguyễn
              </h3>
              <span className="text-base font-normal">
                {roomDetail?.guests} khách . Phòng studio .{" "}
                {roomDetail?.bedRoom} giường . {roomDetail?.bath} phòng tắm
              </span>
            </div>
            <div>
              <img
                className="w-14 h-14 rounded-full"
                src={avtHost}
                alt="avatarHost"
              />
            </div>
          </div>
          <div className="py-5 border-t-2 border-b-2 border-gray-100">
            <div className="flex gap-4 my-3">
              <div className="flex items-center">
                <HomeOutlined className="text-2xl flex" />
              </div>
              <div>
                <p className="mb-0 text-base font-medium">Toàn bộ nhà</p>
                <span className="text-gray-500">
                  Bạn sẽ có căn hộ cho riêng mình.
                </span>
              </div>
            </div>
            <div className="flex gap-4 my-3">
              <div className="flex items-center">
                <KeyOutlined className="text-2xl flex" />
              </div>
              <div>
                <p className="mb-0 text-base font-medium">Tự nhận phòng</p>
                <span className="text-gray-500">
                  Tự nhận phòng bằng cách nhập mã số vào cửa.
                </span>
              </div>
            </div>
            <div className="flex gap-4 my-3">
              <div className="flex items-center">
                <ClearOutlined className="text-2xl flex" />
              </div>
              <div>
                <p className="mb-0 text-base font-medium">
                  Sạch sẽ và ngăn nắp
                </p>
                <span className="text-gray-500">
                  3 khách gần đây cho biết chỗ ở này sạch sẽ tinh tươm.
                </span>
              </div>
            </div>
            <div className="flex gap-4 my-3">
              <div className="flex items-center">
                <WifiOutlined className="text-2xl flex" />
              </div>
              <div>
                <p className="mb-0 text-base font-medium">
                  Tiện nghi cho cuộc sống hàng ngày
                </p>
                <span className="text-gray-500">
                  Chủ nhà đã trang bị chỗ ở này để cho thuê dài hạn – có sẵn nhà
                  bếp, Wi-fi, máy giặt và chỗ đỗ xe miễn phí.
                </span>
              </div>
            </div>
          </div>
          <div className="text-base font-normal py-5 border-b-2 border-gray-100">
            <p className="my-1">
              • Phòng và khu vực chung được khử trùng bằng cồn 70% giữa các
              khách
            </p>
            <p className="my-1">• Đi lại an toàn là điều quan trọng nhất!!</p>
            <p className="my-1">• Khu dân cư địa phương, an toàn, văn hóa.</p>
            <p className="my-1">
              • Nhiều nhà hàng địa phương và quán ăn đường phố dưới đường
            </p>
            <p className="my-1">• Sạch không tì vết.</p>
            <p className="my-1">• Bàn làm việc. WIFI tốc độ cao.</p>
            <button className="my-3 flex items-baseline gap-1">
              <span className="text-lg font-medium underline">
                Hiển thị thêm
              </span>
              <RightOutlined />
            </button>
          </div>

          <div className="py-5 border-b-2 border-gray-100">
            <h3 className="text-2xl mb-1">Nơi này có những gì cho bạn</h3>
            <div className="flex flex-wrap">
              <div className="w-1/2 flex gap-4 my-2">
                <div className="flex items-center text-2xl">
                  <GiForkKnifeSpoon />
                </div>
                <span
                  className={`text-base ${
                    !roomDetail?.kitchen && "line-through"
                  }`}
                >
                  Bếp
                </span>
              </div>
              <div className="w-1/2 flex gap-4 my-2">
                <div className="flex items-center text-2xl">
                  <WifiOutlined />
                </div>
                <span
                  className={`text-base ${!roomDetail?.wifi && "line-through"}`}
                >
                  Wi-fi
                </span>
              </div>
              <div className="w-1/2 flex gap-4 my-2">
                <div className="flex items-center text-2xl">
                  <BiTv />
                </div>
                <span
                  className={`text-base ${
                    !roomDetail?.cableTV && "line-through"
                  }`}
                >
                  TV với truyền hình cáp tiêu chuẩn
                </span>
              </div>
              <div className="w-1/2 flex gap-4 my-2">
                <div className="flex items-center text-2xl">
                  <MdOutlineElevator />
                </div>
                <span
                  className={`text-base ${
                    !roomDetail?.elevator && "line-through"
                  }`}
                >
                  Thang máy
                </span>
              </div>
              <div className="w-1/2 flex gap-4 my-2">
                <div className="flex items-center text-2xl">
                  <GiWashingMachine />
                </div>
                <span
                  className={`text-base ${
                    !roomDetail?.heating && "line-through"
                  }`}
                >
                  Máy giặt
                </span>
              </div>
              <div className="w-1/2 flex gap-4 my-2">
                <div className="flex items-center text-2xl">
                  <FaHotTub />
                </div>
                <span
                  className={`text-base ${
                    !roomDetail?.hotTub && "line-through"
                  }`}
                >
                  Bồn nước nóng
                </span>
              </div>
              <div className="w-1/2 flex gap-4 my-2">
                <div className="flex items-center text-2xl">
                  <GiFireplace />
                </div>
                <span
                  className={`text-base ${
                    !roomDetail?.indoorFireplace && "line-through"
                  }`}
                >
                  Lò sưởi trong nhà
                </span>
              </div>
              <div className="w-1/2 flex gap-4 my-2">
                <div className="flex items-center text-2xl">
                  <CgGym />
                </div>
                <span
                  className={`text-base ${!roomDetail?.gym && "line-through"}`}
                >
                  Phòng gym
                </span>
              </div>
              <div className="w-1/2 flex gap-4 my-2">
                <div className="flex items-center text-2xl">
                  <MdOutlineDryCleaning />
                </div>
                <span
                  className={`text-base ${
                    !roomDetail?.dryer && "line-through"
                  }`}
                >
                  Máy sấy tóc
                </span>
              </div>
              <div className="w-1/2 flex gap-4 my-2">
                <div className="flex items-center text-2xl">
                  <FaSwimmer />
                </div>
                <span
                  className={`text-base ${!roomDetail?.pool && "line-through"}`}
                >
                  Hồ bơi
                </span>
              </div>
            </div>
          </div>

          <div className="my-5 h-80 relative">
            <h3 className="text-2xl font-medium my-1">
              {days
                ? `${days} đêm tại ${roomDetail?.name}`
                : "Chọn ngày nhận phòng"}
            </h3>
            {!days && (
              <span className="text-gray-500">
                Thêm ngày đi để biết giá chính xác
              </span>
            )}
            <div className="absolute top-8 left-0">
              <RangePicker
                onChange={handleChangeDate}
                value={[bookingDate.checkIn, bookingDate.checkOut]}
                format="DD/MM/YYYY"
                className="text-left w-60"
                disabledDate={disabledDate}
                open={true}
                bordered={false}
                allowClear={false}
                placeholder={["Ngày đến", "Ngày đi"]}
                separator={days ? <SwapRightOutlined /> : false}
                suffixIcon={false}
                style={days ? { width: "100%" } : { width: "0px" }}
                popupStyle={{ zIndex: 99 }}
              />
            </div>
            {days && (
              <button
                onClick={handleClearDate}
                style={{
                  position: "absolute",
                  top: "12.5%",
                  left: "38%",
                  color: " #a19c9c",
                  fontSize: "16px",
                  display: "flex",
                }}
              >
                <CloseCircleOutlined />
              </button>
            )}
          </div>
        </div>
        <div className="w-5/12 pt-5 pl-24">
          <div className="detail__menu__booking shadow-xl w-full sticky right-0 top-24">
            <div className="flex justify-between items-baseline">
              <div className="text-black text-base">
                <span className="text-2xl font-bold">
                  {roomDetail?.price?.toLocaleString()}đ
                </span>{" "}
                / đêm
              </div>
              <div className="flex justify-between items-center gap-1">
                <StarFilled className="" style={{ color: "red" }} />
                <div>
                  <span className="text-sm font-semibold">
                    {roomDetail?.locationId?.valueate / 2}
                  </span>{" "}
                  <span className="text-sm font-semibold text-gray-500 underline">
                    ({roomDetail?.locationId?.valueate * 8} đánh giá)
                  </span>
                </div>
              </div>
            </div>
            <div
              style={{ border: "1px solid #000" }}
              className="rounded-lg overflow-hidden mt-5"
            >
              <div
                style={{ borderBottom: "1px solid #000" }}
                className="relative flex items-end h-12 w-full"
              >
                <RangePicker
                  onChange={handleChangeDate}
                  value={[bookingDate.checkIn, bookingDate.checkOut]}
                  bordered={false}
                  disabledDate={disabledDate}
                  allowClear={false}
                  format="DD/MM/YYYY"
                  className="text-left w-full"
                  suffixIcon={false}
                  separator={false}
                  placeholder={["Thêm ngày", "Thêm ngày"]}
                  popupStyle={{ zIndex: 99 }}
                />
                <label
                  htmlFor="checkin"
                  className="absolute left-3 top-0.5 text-black font-semibold text-sm"
                >
                  Nhận phòng
                </label>
                <label
                  htmlFor="checkout"
                  style={{ left: "52.5%" }}
                  className="absolute top-0.5 text-black font-semibold text-sm"
                >
                  Trả phòng
                </label>
                <div
                  style={{
                    borderLeft: "1px solid #000",
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: "50%",
                    height: "100%",
                  }}
                ></div>
                {days && (
                  <button
                    onClick={handleClearDate}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "4%",
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
                className="relative flex items-center h-12 w-full cursor-pointer"
              >
                <div
                  style={{ paddingLeft: 11, paddingRight: 11, marginTop: 15 }}
                >
                  {quantity.nguoiLon + quantity.treEm + " khách"}
                  {quantity.emBe ? ", " + quantity.emBe + " em bé" : ""}
                </div>
                <div style={{ position: "absolute", top: "25%", right: "3%" }}>
                  {showMenuDropdown ? <UpOutlined /> : <DownOutlined />}
                </div>
                <label
                  htmlFor="guest"
                  className="absolute left-3 top-0.5 text-black font-semibold text-sm cursor-pointer"
                >
                  Khách
                </label>
              </div>
            </div>
            <div className="my-3">
              <button
                onClick={() =>
                  localStorage.getItem(USER_LOGIN_TOKEN)
                    ? setVisibleBooking(true)
                    : alert("Bạn chưa đăng nhập!")
                }
                className="detail__btn_booking"
              >
                Đặt phòng
              </button>
              <Drawer
                title={
                  <div className="flex justify-center ">
                    <button
                      onClick={() => setVisibleBooking(false)}
                      className="absolute top-4 left-3.5 hover:bg-gray-100 rounded-full px-2 py-2 flex justify-center items-center"
                    >
                      <LeftOutlined className="text-xl" />
                    </button>
                    <span className="text-2xl font-bold">
                      Xác nhận và thanh toán
                    </span>
                  </div>
                }
                placement={"bottom"}
                contentWrapperStyle={{
                  width: "80%",
                  height: "85%",
                  borderRadius: 15,
                  overflow: "hidden",
                  alignItems: "center",
                  bottom: "unset",
                }}
                visible={visibleBooking}
                zIndex={999}
                closable={false}
                onClose={() => setVisibleBooking(false)}
                className="flex justify-center items-center"
              >
                <div className="flex justify-center items-start gap-20">
                  <div className="w-1/2">
                    <div>
                      <h3 className="text-xl font-bold">Chuyến đi của bạn</h3>
                      <div className="flex justify-between items-center my-5">
                        <div className="text-lg font-medium">Ngày</div>
                        <div className="text-lg">
                          {days
                            ? moment(bookingDate?.checkIn).format(
                                "DD/MM/YYYY"
                              ) +
                              " - " +
                              moment(bookingDate?.checkOut).format("DD/MM/YYYY")
                            : "Bạn chưa chọn ngày"}
                        </div>
                      </div>
                      <div className="flex justify-between items-center my-5">
                        <div className="text-lg font-medium">Khách</div>
                        <div className="text-lg">
                          {quantity.nguoiLon + quantity.treEm + " khách"}
                          {quantity.emBe ? ", " + quantity.emBe + " em bé" : ""}
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="my-5">
                      <div className="flex justify-between">
                        <h3 className="text-xl font-bold">Thanh toán bằng</h3>
                        <div className="flex items-center gap-2">
                          <img
                            className="w-10"
                            src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_visa.0adea522bb26bd90821a8fade4911913.svg"
                            alt="visa"
                          />
                          <img
                            className="w-10"
                            src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_mastercard.f18379cf1f27d22abd9e9cf44085d149.svg"
                            alt="mastercard"
                          />
                          <img
                            className="w-11"
                            src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_googlepay.3f786bc031b59575d24f504dfb859da0.svg"
                            alt="googlepay"
                          />
                          <img
                            className="w-12"
                            src="https://a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_paypal.faa3042fa2daf6b4a9822cc4b43e8609.svg"
                            alt="paypal"
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap">
                        <div className="w-1/2 flex items-end my-2">
                          <input
                            id="visa"
                            type="radio"
                            name="payment"
                            className="hidden"
                          />
                          <label
                            htmlFor="visa"
                            className="flex items-center cursor-pointer text-base font-medium"
                          >
                            <span className="w-4 h-4 inline-block mr-1 rounded-full border border-gray-400" />
                            Visa
                          </label>
                        </div>

                        <div className="w-1/2 flex items-end my-2">
                          <input
                            id="mastercard"
                            type="radio"
                            name="payment"
                            className="hidden"
                          />
                          <label
                            htmlFor="mastercard"
                            className="flex items-center cursor-pointer text-base font-medium"
                          >
                            <span className="w-4 h-4 inline-block mr-1 rounded-full border border-gray-400" />
                            Master Card
                          </label>
                        </div>

                        <div className="w-1/2 flex items-end my-2">
                          <input
                            id="googlepay"
                            type="radio"
                            name="payment"
                            className="hidden"
                          />
                          <label
                            htmlFor="googlepay"
                            className="flex items-center cursor-pointer text-base font-medium"
                          >
                            <span className="w-4 h-4 inline-block mr-1 rounded-full border border-gray-400" />
                            Google Pay
                          </label>
                        </div>

                        <div className="w-1/2 flex items-end my-2">
                          <input
                            id="paypal"
                            type="radio"
                            name="payment"
                            className="hidden"
                          />
                          <label
                            htmlFor="paypal"
                            className="flex items-center cursor-pointer text-base font-medium"
                          >
                            <span className="w-4 h-4 inline-block mr-1 rounded-full border border-gray-400" />
                            Paypal
                          </label>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="my-5 text-black">
                      <h3 className="text-xl font-bold">
                        Bắt buộc cho chuyến đi của bạn
                      </h3>
                      <div className="my-4">
                        <p className="text-lg font-medium mb-0">Ảnh đại diện</p>
                        <span className="text-base font-normal">
                          Chủ nhà muốn biết người sẽ ở nhà họ là ai.
                        </span>
                      </div>
                      <div className="my-4">
                        <p className="text-lg font-medium mb-0">
                          Số điện thoại
                        </p>
                        <span className="text-base font-normal">
                          Thêm và xác nhận số điện thoại của bạn để nhận thông
                          tin cập nhật về chuyến đi.
                        </span>
                      </div>
                    </div>
                    <hr />
                    <div className="my-5 text-black">
                      <h3 className="text-xl font-bold">Chính sách hủy</h3>
                      <div className="my-4">
                        <span className="text-base font-normal">
                          <b>
                            Hủy miễn phí trước 16:00, ngày{" "}
                            {moment(date).format("DD/MM/YYYY")}.
                          </b>{" "}
                          Sau đó, hãy hủy trước 14:00 ngày{" "}
                          {moment(date.setMonth(date.getMonth() + 1)).format(
                            "DD/MM/YYYY"
                          )}
                          . để được hoàn lại 50%, trừ chi phí đêm đầu tiên và
                          phí dịch vụ.
                        </span>
                        <br />
                        <button className="text-base font-bold underline">
                          Tìm hiểu thêm
                        </button>
                      </div>
                      <div className="my-4">
                        <span className="text-base font-normal">
                          Chính sách trường hợp bất khả kháng của chúng tôi
                          không áp dụng cho các trường hợp gián đoạn đi lại do
                          COVID-19 gây ra.
                        </span>
                        <br />
                        <button className="text-base font-bold underline">
                          Tìm hiểu thêm
                        </button>
                      </div>
                    </div>
                    <hr />
                    <div className="my-4 text-base font-normal">
                      Bằng việc chọn nút <b>XÁC NHẬN</b> bên dưới, tôi đồng ý
                      với Nội quy nhà của Chủ nhà, Các yêu cầu về an toàn trong
                      đại dịch COVID-19 của Airbnb và Chính sách hoàn tiền cho
                      khách.
                    </div>
                    {!payment ? (
                      <div className="my-3">
                        <button
                          onClick={() => setPayment(true)}
                          className="detail__btn_booking"
                        >
                          XÁC NHẬN
                        </button>
                      </div>
                    ) : (
                      <div className="my-3 flex items-center gap-3">
                        <CheckCircleTwoTone
                          twoToneColor="#52c41a"
                          className="text-xl ml-3"
                        />
                        <span>
                          Bạn đã xác nhận nội dung điều khoản! Vui lòng hoàn tất
                          <b> THANH TOÁN</b>.
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="w-1/2 detail__menu__booking shadow-xl sticky right-0 top-0">
                    <div>
                      <div className="flex gap-5 text-black">
                        <img
                          className="rounded-md w-28 h-24"
                          src={roomDetail?.image}
                          alt={roomDetail?.name}
                        />
                        <div className="flex flex-wrap">
                          <div className="w-full flex justify-between items-center">
                            <span className="text-lg font-medium">
                              ⭐
                              {days
                                ? `${days} đêm tại ${roomDetail?.name}`
                                : roomDetail?.name}
                              ❤️
                            </span>
                          </div>
                          <div className="text-sm font-normal text-gray-500">
                            <span>
                              {roomDetail?.guests} khách . {roomDetail?.bedRoom}{" "}
                              giường . {roomDetail?.bath} phòng tắm
                            </span>
                            <br />
                          </div>
                          <div className="w-full flex justify-between items-center">
                            <div className="flex justify-between items-center gap-1">
                              <StarFilled
                                className="text-base"
                                style={{ color: "red" }}
                              />
                              <span className="font-medium">
                                {roomDetail?.locationId?.valueate / 2}
                              </span>
                            </div>
                            <div className="text-base font-medium">
                              <span>
                                {roomDetail?.price?.toLocaleString()} đ /
                              </span>
                              <span className="text-gray-500"> đêm</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-b-2 border-gray-100 pb-4 text-base text-black">
                      <div className="flex justify-between items-center my-2">
                        <span>
                          {roomDetail?.price?.toLocaleString()}đ x {days} đêm
                        </span>
                        <span>{calcSum.tienPhong.toLocaleString()}đ</span>
                      </div>
                      <div className="flex justify-between items-center my-2">
                        <span>Phí vệ sinh</span>
                        <span>{calcSum.phiVeSinh.toLocaleString()}đ</span>
                      </div>
                      <div className="flex justify-between items-center my-2">
                        <span>Phí dịch vụ</span>
                        <span>{calcSum.phiDichVu.toLocaleString()}đ</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-base font-semibold my-3">
                      <span>Tổng</span>
                      <span>{days ? calcSum.total.toLocaleString() : 0}đ</span>
                    </div>
                    {payment && (
                      <div className="mt-3">
                        <button
                          onClick={handleBooking}
                          className="detail__btn_booking"
                        >
                          THANH TOÁN
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Drawer>
            </div>
            <div className="text-center">
              <span>Bạn vẫn chưa bị trừ tiền</span>
            </div>
            <div className="border-b-2 border-gray-100 pb-4 text-base text-black">
              <div className="flex justify-between items-center my-2">
                <span>
                  {roomDetail?.price?.toLocaleString()}đ x {days} đêm
                </span>
                <span>{calcSum.tienPhong.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between items-center my-2">
                <span>Phí vệ sinh</span>
                <span>{calcSum.phiVeSinh.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between items-center my-2">
                <span>Phí dịch vụ</span>
                <span>{calcSum.phiDichVu.toLocaleString()}đ</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-base font-semibold my-3">
              <span>Tổng</span>
              <span>{days ? calcSum.total.toLocaleString() : 0}đ</span>
            </div>
            {showMenuDropdown && (
              <div className="detail__menu__dropdown">
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
                        onChange={(value) =>
                          onChangeInputNumber("nguoiLon", value)
                        }
                        name="nguoiLon"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="mb-0 text-base font-medium text-black">
                        Trẻ em
                      </p>
                      <span className="text-gray-600">Độ tuổi 2 - 12</span>
                    </div>
                    <div>
                      <InputNumber
                        min={0}
                        max={2}
                        defaultValue={0}
                        value={quantity.treEm}
                        onChange={(value) =>
                          onChangeInputNumber("treEm", value)
                        }
                        name="treEm"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="mb-0 text-base font-medium text-black">
                        Em bé
                      </p>
                      <span className="text-gray-600">Dưới 2</span>
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
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="mb-0 text-base font-medium text-black">
                        Thú cưng
                      </p>
                      <span className="underline text-black font-medium">
                        Bạn muốn mang theo động vật hỗ trợ?
                      </span>
                    </div>
                    <div>
                      <InputNumber
                        min={0}
                        max={0}
                        defaultValue={0}
                        onChange={onChangeInputNumber}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="text-xs text-gray-700 my-5">
                    Chỗ ở này cho phép tối đa 4 khách, không tính em bé. Không
                    được phép mang theo thú cưng.
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
          </div>
        </div>
      </div>

      <div className="border-t-2 border-b-2 border-gray-100">
        <div className="flex items-center my-8 gap-1.5">
          <StarFilled className="text-base" style={{ color: "red" }} />
          <span className="text-2xl font-medium">
            {roomDetail?.locationId?.valueate / 2}
          </span>
          <span className="text-2xl font-medium">·</span>
          <span className="text-2xl font-medium">
            {roomDetail?.locationId?.valueate * 8} đánh giá
          </span>
        </div>
        <div className="flex">
          <div className="w-1/2">
            <div className="flex items-center justify-between my-2">
              <div className="w-1/2 text-base font-medium">Mức độ sạch sẽ</div>
              <div className="w-1/2">
                <div style={{ width: 150 }}>
                  <Progress
                    percent={98}
                    format={(percent) => (
                      <span className="font-bold text-black">
                        {percent / 20}
                      </span>
                    )}
                    strokeColor="black"
                    trailColor="#ddd"
                    size="small"
                    strokeWidth={4}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between my-2">
              <div className="w-1/2 text-base font-medium">Liên lạc</div>
              <div className="w-1/2">
                <div style={{ width: 150 }}>
                  <Progress
                    percent={98}
                    format={(percent) => (
                      <span className="font-bold text-black">
                        {percent / 20}
                      </span>
                    )}
                    strokeColor="black"
                    trailColor="#ddd"
                    size="small"
                    strokeWidth={4}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between my-2">
              <div className="w-1/2 text-base font-medium">Nhận phòng</div>
              <div className="w-1/2">
                <div style={{ width: 150 }}>
                  <Progress
                    percent={100}
                    format={(percent) => (
                      <span className="font-bold text-black">
                        {percent / 20}
                      </span>
                    )}
                    strokeColor="black"
                    trailColor="#ddd"
                    size="small"
                    strokeWidth={4}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="flex items-center justify-between my-2">
              <div className="w-1/2 text-base font-medium">Độ chính xác</div>
              <div className="w-1/2">
                <div style={{ width: 150 }}>
                  <Progress
                    percent={100}
                    format={(percent) => (
                      <span className="font-bold text-black">
                        {percent / 20}
                      </span>
                    )}
                    strokeColor="black"
                    trailColor="#ddd"
                    size="small"
                    strokeWidth={4}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between my-2">
              <div className="w-1/2 text-base font-medium">Vị trí</div>
              <div className="w-1/2">
                <div style={{ width: 150 }}>
                  <Progress
                    percent={82}
                    format={(percent) => (
                      <span className="font-bold text-black">
                        {percent / 20}
                      </span>
                    )}
                    strokeColor="black"
                    trailColor="#ddd"
                    size="small"
                    strokeWidth={4}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between my-2">
              <div className="w-1/2 text-base font-medium">Giá trị</div>
              <div className="w-1/2">
                <div style={{ width: 150 }}>
                  <Progress
                    percent={96}
                    format={(percent) => (
                      <span className="font-bold text-black">
                        {percent / 20}
                      </span>
                    )}
                    strokeColor="black"
                    trailColor="#ddd"
                    size="small"
                    strokeWidth={4}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap my-3">
          {reviewList?.map(
            (item, index) =>
              index >= 0 &&
              index < 4 && (
                <div key={index} className="w-1/2 my-3 pr-20">
                  <div className="flex items-center my-4 gap-3">
                    <div>
                      <img
                        className="w-14 h-14 rounded-full"
                        src={item.userId?.avatar}
                        alt={item.userId?.name}
                      />
                    </div>
                    <div>
                      <p className="mb-0 text-lg font-medium">
                        {item.userId?.name}
                      </p>
                      <span className="text-sm text-gray-500">
                        {moment(item.updatedAt).format("DD/MM/YYYY - hh:mm")}
                      </span>
                    </div>
                  </div>
                  <div className="text-lg font-normal leading-6">
                    {item.content}
                  </div>
                </div>
              )
          )}
        </div>
        {reviewList.length >= 5 && (
          <div
            onClick={showDrawerRating}
            style={{ border: "1px solid black" }}
            className="cursor-pointer hover:bg-gray-100 duration-300 my-5 inline-block bg-white rounded-md px-5 py-2.5 text-base font-semibold"
          >
            <span className="hover:underline">
              Hiển thị tất cả {reviewList.length} đánh giá
            </span>
          </div>
        )}

        <Drawer
          placement={"bottom"}
          contentWrapperStyle={{
            width: "80%",
            height: "85%",
            borderRadius: 15,
            overflow: "hidden",
            alignItems: "center",
            bottom: "unset",
          }}
          visible={visibleRating}
          zIndex={999}
          closable={false}
          onClose={() => setVisibleRating(false)}
          className="flex justify-center items-center"
        >
          <div>
            <button
              onClick={() => setVisibleRating(false)}
              className="hover:bg-gray-100 rounded-full px-2 py-2 flex justify-center items-center"
            >
              <CloseOutlined className="text-lg" />
            </button>
          </div>
          <div className="flex justify-center items-start">
            <div className="w-1/3">
              <div className="flex items-center my-4 gap-1.5">
                <StarFilled className="text-3xl" style={{ color: "red" }} />
                <span className="text-3xl font-bold">
                  {roomDetail?.locationId?.valueate / 2}
                </span>
                <span className="text-3xl font-bold">·</span>
                <span className="text-3xl font-bold">
                  {roomDetail?.locationId?.valueate * 8} đánh giá
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between my-2">
                  <div className="w-1/2 text-sm font-normal">
                    Mức độ sạch sẽ
                  </div>
                  <div className="w-1/2">
                    <div style={{ width: 150 }}>
                      <Progress
                        percent={98}
                        format={(percent) => (
                          <span className="font-bold text-black">
                            {percent / 20}
                          </span>
                        )}
                        strokeColor="black"
                        trailColor="#ddd"
                        size="small"
                        strokeWidth={4}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between my-2">
                  <div className="w-1/2 text-sm font-normal">Liên lạc</div>
                  <div className="w-1/2">
                    <div style={{ width: 150 }}>
                      <Progress
                        percent={98}
                        format={(percent) => (
                          <span className="font-bold text-black">
                            {percent / 20}
                          </span>
                        )}
                        strokeColor="black"
                        trailColor="#ddd"
                        size="small"
                        strokeWidth={4}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between my-2">
                  <div className="w-1/2 text-sm font-normal">Nhận phòng</div>
                  <div className="w-1/2">
                    <div style={{ width: 150 }}>
                      <Progress
                        percent={100}
                        format={(percent) => (
                          <span className="font-bold text-black">
                            {percent / 20}
                          </span>
                        )}
                        strokeColor="black"
                        trailColor="#ddd"
                        size="small"
                        strokeWidth={4}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between my-2">
                  <div className="w-1/2 text-sm font-normal">Độ chính xác</div>
                  <div className="w-1/2">
                    <div style={{ width: 150 }}>
                      <Progress
                        percent={100}
                        format={(percent) => (
                          <span className="font-bold text-black">
                            {percent / 20}
                          </span>
                        )}
                        strokeColor="black"
                        trailColor="#ddd"
                        size="small"
                        strokeWidth={4}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between my-2">
                  <div className="w-1/2 text-sm font-normal">Vị trí</div>
                  <div className="w-1/2">
                    <div style={{ width: 150 }}>
                      <Progress
                        percent={82}
                        format={(percent) => (
                          <span className="font-bold text-black">
                            {percent / 20}
                          </span>
                        )}
                        strokeColor="black"
                        trailColor="#ddd"
                        size="small"
                        strokeWidth={4}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between my-2">
                  <div className="w-1/2 text-sm font-normal">Giá trị</div>
                  <div className="w-1/2">
                    <div style={{ width: 150 }}>
                      <Progress
                        percent={96}
                        format={(percent) => (
                          <span className="font-bold text-black">
                            {percent / 20}
                          </span>
                        )}
                        strokeColor="black"
                        trailColor="#ddd"
                        size="small"
                        strokeWidth={4}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-start items-center gap-3 my-5">
                <div className="flex justify-center items-center text-xl">
                  <TranslationOutlined />
                </div>
                <span>
                  Một số đánh giá có thể được hiển thị ở ngôn ngữ gốc.{" "}
                  <span className="font-medium underline cursor-pointer">
                    Dịch
                  </span>
                </span>
              </div>
            </div>

            <div className="w-2/3 pl-20">
              <div className="detail__search__rating">
                <button className="w-10 h-10 flex items-center justify-center text-black text-xl">
                  <SearchOutlined />
                </button>
                <input
                  type="text"
                  placeholder="Tìm kiếm đánh giá"
                  className="bg-transparent border-none outline-none focus:outline-none"
                />
              </div>

              <div className="overflow-y-scroll h-80">
                <div className="flex flex-wrap">
                  {reviewList?.map((item, index) => {
                    return (
                      <div key={index} className="w-full my-1">
                        <div className="flex items-center my-2 gap-3">
                          <div>
                            <img
                              className="w-14 h-14 rounded-full"
                              src={item.userId?.avatar}
                              alt={item.userId?.name}
                            />
                          </div>
                          <div>
                            <p className="mb-0 text-base font-medium">
                              {item.userId?.name}
                            </p>
                            <span className="text-sm text-gray-500">
                              {moment(item.updatedAt).format(
                                "DD/MM/YYYY - hh:mm"
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="text-base font-normal leading-6">
                          {item.content}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      </div>

      <div className="py-10">
        <h3 className="text-2xl">Nơi bạn sẽ đến</h3>
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d62711.53587748575!2d106.69658158836616!3d10.77519303061222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1636726636746!5m2!1svi!2s"
            width="100%"
            height={450}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="map"
          />
        </div>
        <p className="text-lg font-medium my-5">
          {roomDetail?.locationId?.name}, {roomDetail?.locationId?.province},{" "}
          {roomDetail?.locationId?.country?.toUpperCase()}
        </p>
        <span className="text-base font-normal leading-6">
          {roomDetail?.description}
        </span>
      </div>

      <div className="py-10 border-t-2 border-b-2 border-gray-100">
        <div className="flex items-center my-4 gap-3">
          <div>
            <img
              className="w-16 h-16 rounded-full"
              src={avtHost}
              alt="avatarHost"
            />
          </div>
          <div>
            <p className="mb-0 text-xl font-medium">Chủ nhà Hiệp Nguyễn</p>
            <span className="text-sm text-gray-500">
              Đã tham gia vào tháng 10 năm 2021
            </span>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2 pr-20">
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-3 mr-3">
                <StarFilled className="text-lg" style={{ color: "red" }} />
                <span className="text-base font-normal">{1.681} đánh giá</span>
              </div>
              <div className="flex items-center gap-3 mr-3">
                <MdVerifiedUser className="text-lg" style={{ color: "red" }} />
                <span className="text-base font-normal">
                  Đã xác minh danh tính
                </span>
              </div>
              <div className="flex items-center gap-3 mr-3">
                <RiMedalFill className="text-lg" style={{ color: "red" }} />
                <span className="text-base font-normal">Chủ nhà siêu cấp</span>
              </div>
            </div>
            <div className="text-lg font-normal leading-6 mt-5">
              Vietnamese American who's been working and living in Saigon for
              more than 10 years. Love the field of design and have a background
              in hospitality so Airbnb is just the perfect way for me to do two
              things that interest me.
            </div>
            <div className="text-lg font-normal leading-6 mt-5">
              <p className="mb-2 font-medium">Trong thời gian ở</p>
              <span>
                Một trong những thành viên trong nhóm của chúng tôi sẽ cố gắng
                gặp bạn khi nhận phòng. Bạn cũng có thể tự đăng ký bằng các mã
                khóa riêng biệt để vào tòa nhà và đơn vị của mình.
              </span>
            </div>
            <div className="text-lg font-normal leading-6 mt-5">
              <p className="mb-2 font-medium">Thang là một Chủ nhà siêu cấp</p>
              <span>
                Chủ nhà siêu cấp là những người có kinh nghiệm, được đánh giá
                cao và cam kết mang lại kỳ nghỉ tuyệt vời cho khách.
              </span>
            </div>
          </div>
          <div className="w-1/2">
            <div className="w-2/3 text-base font-normal">
              <p>Ngôn ngữ: English</p>
              <p>Tỉ lệ phản hồi: 99%</p>
              <p>Thời gian phản hồi: trong vòng một giờ</p>
              <div className="mt-10 mb-8">
                <a
                  style={{ border: "1px solid" }}
                  className="border-black hover:bg-gray-100 duration-300 text-black text-lg font-semibold hover:text-black px-5 py-3 rounded-md"
                  href="/home"
                >
                  Liên hệ với chủ nhà
                </a>
              </div>
              <div className="flex items-center gap-5 pr-20">
                <div>
                  <FaMoneyCheckAlt
                    className="text-xl"
                    style={{ color: "red" }}
                  />
                </div>
                <div className="text-xs">
                  Để bảo vệ khoản thanh toán của bạn, tuyệt đối không chuyển
                  tiền hoặc liên lạc bên ngoài trang web hoặc ứng dụng Airbnb.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-10">
        <h3 className="text-2xl mb-5">Những điều cần biết</h3>
        <div className="flex gap-16 text-black">
          <div className="w-1/3">
            <p className="text-base font-medium">Nội quy nhà</p>
            <div className="flex items-center gap-4 text-base font-normal my-1">
              <div>
                <AiFillClockCircle className="text-xl" />
              </div>
              <span>Nhận phòng: Sau 14:00</span>
            </div>
            <div className="flex items-center gap-4 text-base font-normal my-1">
              <div>
                <AiFillClockCircle className="text-xl" />
              </div>
              <span>Trả phòng: 12:00</span>
            </div>
            <div className="flex items-center gap-4 text-base font-normal my-1">
              <div>
                <BsFillDoorOpenFill className="text-xl" />
              </div>
              <span>Tự nhận phòng bằng bàn phím</span>
            </div>
            <div className="flex items-center gap-4 text-base font-normal my-1">
              <div>
                <MdOutlineSmokeFree className="text-xl" />
              </div>
              <span>Không hút thuốc</span>
            </div>
            <div className="flex items-center gap-4 text-base font-normal my-1">
              <div>
                <MdOutlinePets className="text-xl" />
              </div>
              <span>Không thú cưng</span>
            </div>
            <div className="flex items-center gap-4 text-base font-normal my-1">
              <div>
                <GiPartyFlags className="text-xl" />
              </div>
              <span>Không được tổ chức tiệc hoặc sự kiện</span>
            </div>
          </div>
          <div className="w-1/3">
            <p className="text-base font-medium">Y tế và an toàn</p>
            <div className="flex items-center gap-4 text-base font-normal my-1">
              <div>
                <BsStars className="text-xl" />
              </div>
              <span>
                Đã cam kết thực hiện quy trình vệ sinh tăng cường của Airbnb.
              </span>
            </div>
            <div className="flex items-center gap-4 text-base font-normal my-1">
              <div>
                <FaHandHoldingWater className="text-xl" />
              </div>
              <span>
                Áp dụng hướng dẫn về giãn cách xã hội và các hướng dẫn khác liên
                quan đến COVID-19 của Airbnb
              </span>
            </div>
            <div className="flex items-center gap-4 text-base font-normal my-1">
              <div>
                <GiPhotoCamera className="text-xl" />
              </div>
              <span>Camera an ninh/thiết bị ghi âm</span>
            </div>
            <div className="flex items-center gap-4 text-base font-normal my-1">
              <div>
                <GiGasMask className="text-xl" />
              </div>
              <span>Máy phát hiện khí CO</span>
            </div>
            <div className="flex items-center gap-4 text-base font-normal my-1">
              <div>
                <GiSmokeBomb className="text-xl" />
              </div>
              <span>Máy báo khói</span>
            </div>
          </div>
          <div className="w-1/3">
            <p className="text-base font-medium">Chính sách hủy</p>
            <span className="text-base font-normal">
              Hủy miễn phí trước 20 thg 12
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
