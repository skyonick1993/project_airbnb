import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { HeartOutlined, StarFilled } from "@ant-design/icons";
import "./Location.css";
import { useDispatch } from "react-redux";
import { getRoomListAction } from "../../store/actions/roomList";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from "moment";

const Location = (props) => {
  const dispatch = useDispatch();
  let { roomList } = useSelector((state) => state.roomListReducer);
  let [pagination, setPagination] = useState({
    current: 1,
    minIndex: 0,
    maxIndex: 4,
  });
  let today = new Date();
  today = moment(today).format("DD/MM/YYYY");

  const handlePagination = (page, pageSize) => {
    console.log(page, pageSize);
    setPagination({
      current: page,
      minIndex: (page - 1) * pageSize,
      maxIndex: page * pageSize,
    });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    dispatch(getRoomListAction(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  return (
    <div className="flex justify-center items-start location">
      <div className="w-3/5 mx-5 my-10">
        <div>
          <div>
            <span>
              Hơn {roomList.length} chỗ ở · từ {today}
            </span>
            <h3 className="text-3xl font-bold py-2">
              Chỗ ở tại {roomList[0]?.locationId.province}
            </h3>
          </div>
          <div className="flex justify-start text-xs gap-2">
            <div className="btn">Loại nơi ở</div>
            <div className="btn">Giá</div>
            <div className="btn">Đặt ngay</div>
            <div className="btn">Phòng và phòng ngủ</div>
            <div className="btn">Bộ lọc khác</div>
          </div>
        </div>
        <div className="my-5">
          {roomList?.map(
            (item, index) =>
              index >= pagination.minIndex &&
              index < pagination.maxIndex && (
                <NavLink
                  to={`/detail/${item._id}`}
                  key={index}
                  className="flex py-5 gap-5 border-t-2 text-black hover:text-black cursor-pointer"
                >
                  <img
                    className="rounded-md w-52 h-52"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="flex flex-wrap">
                    <div className="w-full flex justify-between items-center">
                      <span className="text-lg font-medium">{item.name}</span>
                      <div className="flex justify-center items-center hover:bg-gray-300 hover:bg-opacity-30 rounded-full h-10 w-10">
                        <HeartOutlined className="text-xl font-bold" />
                      </div>
                    </div>
                    <div className="text-sm font-normal text-gray-500">
                      <span>
                        {item.guests} Khách . {item.bedRoom} giường .{" "}
                        {item.bath} phòng tắm
                      </span>
                      <br />
                      <span>
                        {item.elevator && "Thang máy"}{" "}
                        {item.hotTub && "Bồn nước nóng"} {item.pool && "Hồ bơi"}{" "}
                        {item.indoorFireplace && "Lò sưởi"}{" "}
                        {item.dryer && "Máy sấy"} {item.gym && "Phòng Gym"}{" "}
                        {item.kitchen && "Nhà bếp"} {item.wifi && "Wifi"}{" "}
                        {item.heating && "Phòng xông hơi"}{" "}
                        {item.cableTV && "Truyền hình cáp"}
                      </span>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <div className="flex justify-between items-center gap-1">
                        <StarFilled
                          className="text-lg flex"
                          style={{ color: "red" }}
                        />
                        <span className="font-medium">5</span>
                      </div>
                      <div className="text-lg font-medium">
                        <span>{item.price.toLocaleString()} đ /</span>
                        <span className="text-gray-500"> đêm</span>
                      </div>
                    </div>
                  </div>
                </NavLink>
              )
          )}
          <Pagination
            onChange={handlePagination}
            current={pagination.current}
            defaultCurrent={1}
            pageSize={4}
            total={roomList.length}
            className="text-center"
          />
        </div>
      </div>
      <div className="w-2/5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249523.86022278346!2d109.1115610381083!3d12.261112111923511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3170677811cc886f%3A0x5c4bbc0aa81edcb9!2zVHAuIE5oYSBUcmFuZywgS2jDoW5oIEjDsmEsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1637332588423!5m2!1svi!2s"
          width={"100%"}
          height={1240}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="map"
        />
      </div>
    </div>
  );
};

export default Location;
