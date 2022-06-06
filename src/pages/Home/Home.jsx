import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import bgImg from "../../assets/imgs/bg-home.jpg";
import "./Home.css";

const HomeCarousel = (props) => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        width: "100%",
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    ></div>
  );
};

const Home = (props) => {
  let { locationList } = useSelector((state) => state.locationListReducer);
  let placeList = [
    {
      id: "01",
      content: "Toàn bộ nhà",
      image:
        "https://a0.muscache.com/im/pictures/7d82ca14-56e5-4465-8218-dcfa7d69b6ac.jpg?im_w=480",
    },
    {
      id: "02",
      content: "Chỗ ở độc đáo",
      image:
        "https://a0.muscache.com/im/pictures/36f53e61-db8d-403c-9122-5b761c0e4264.jpg?im_w=480",
    },
    {
      id: "03",
      content: "Trang trại và thiên nhiên",
      image:
        "	https://a0.muscache.com/im/pictures/2f13349d-879d-43c6-83e3-8e5679291d53.jpg?im_w=480",
    },
    {
      id: "04",
      content: "Cho phép mang theo thú cưng",
      image:
        "https://a0.muscache.com/im/pictures/10a638e1-6aff-4313-8033-1275cec83987.jpg?im_w=480",
    },
  ];
  let expList = [
    {
      id: "01",
      title: "Trải nghiệm",
      content: "Tìm các hoạt động khó quên gần bạn.",
      image:
        "https://a0.muscache.com/im/pictures/ad109d56-2421-40cd-98e6-e114160dc85b.jpg?im_w=720",
      to: "https://www.airbnb.com.vn/s/experiences?location_search=NEARBY",
    },
    {
      id: "02",
      title: "Trải nghiệm trực tuyến",
      content:
        "Các hoạt động tương tác, truyền trực tiếp dưới sự dẫn dắt của Người tổ chức.",
      image:
        "https://a0.muscache.com/im/pictures/0ce799cb-7553-4369-be9e-d0011e0ef636.jpg?im_w=720",
      to: "https://www.airbnb.com.vn/s/experiences/online",
    },
    {
      id: "03",
      title: "Bộ sưu tập nổi bật: Phiêu du",
      content: "Du lịch tại nhà với Trải nghiệm trực tuyến.",
      image:
        "https://a0.muscache.com/im/pictures/247a1ea3-946d-4eb8-a6ab-e8b9a66846f4.jpg?im_w=720",
      to: "https://www.airbnb.com.vn/s/all?refinement_paths%5B%5D=%2Fplaylists%2F46390&last_search_session_id=9f263ab4-b63f-4e19-8c8f-5287c5660df2&search_type=section_navigation",
    },
  ];

  return (
    <div>
      <HomeCarousel />
      <div className="homeMenu">
        <div className="my-10">
          <h3 className="text-3xl font-medium">
            Khám phá những điểm đến gần đây
          </h3>
          <div className="flex flex-wrap items-center">
            {locationList.map((item) => {
              return (
                <NavLink
                  to={`/location/${item._id}`}
                  key={item._id}
                  className="flex items-center w-1/4 my-2 text-black hover:text-black"
                >
                  <div>
                    <img
                      className="w-16 h-16 rounded-md"
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <div className="ml-2">
                    <span className="font-semibold">{item.province}</span>
                    <br />
                    <span>{item.name}</span>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
        <div>
          <h3 className="text-3xl font-medium">Ở bất cứ đâu</h3>
          <div className="flex gap-5 justify-between items-start">
            {placeList.map((item) => {
              return (
                <div key={item.id} className="w-1/4">
                  <img
                    className=" rounded-md block"
                    src={item.image}
                    alt={item.content}
                  />
                  <p className="text-lg font-semibold my-3">{item.content}</p>
                </div>
              );
            })}
          </div>
        </div>

        <a href="https://www.airbnb.com.vn/host/homes?_ga=2.263255374.333723023.1636264187-1648346013.1636261807&_set_bev_on_new_domain=1636017004_ZTRjYjkzNWEyZGIw">
          <div className="homeInfo rounded-2xl my-10">
            <div className="homeInfo__content">
              <h3 className="text-white text-5xl font-semibold">
                Thử đón tiếp khách
              </h3>
              <p className="text-white text-xl font-normal">
                Kiếm thêm thu nhập và khám phá các cơ hội mới bằng cách chia sẻ
                nơi ở của bạn.
              </p>
              <div className="bg-white rounded-lg px-5 py-3 inline-block">
                <span className="text-black text-base font-medium">
                  Tìm hiểu thêm
                </span>
              </div>
            </div>
          </div>
        </a>

        <div>
          <h3 className="text-3xl font-medium py-5">
            Khám phá những điều nên trải nghiệm
          </h3>
          <div className="flex justify-between items-start gap-5">
            {expList.map((item) => {
              return (
                <a href={item.to} key={item.id} className="w-1/3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="rounded-lg block"
                  />
                  <h4 className="text-black text-xl font-medium my-1">
                    {item.title}
                  </h4>
                  <span className="text-black">{item.content}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
