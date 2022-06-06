import React from "react";
import {
  FacebookOutlined,
  GlobalOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="flex justify-between items-start gap-5 pt-14 pb-10">
        <div className="w-1/4">
          <p className="font-bold uppercase">Giới thiệu</p>
          <p>Phương thức hoạt động của Airbnb</p>
          <p>Trang tin tức</p>
          <p>Airbnb 2021</p>
          <p>Nhà đầu tư</p>
          <p>Airbnb Plus</p>
          <p>Airbnb Luxe</p>
          <p>HotelTonight</p>
          <p>Airbnb for Work</p>
          <p>Nhờ có Host, mọi điều đều có thể</p>
          <p>Cơ hội nghề nghiệp</p>
          <p>Thư của nhà sáng lập</p>
        </div>
        <div className="w-1/4">
          <p className="font-bold uppercase">Cộng đồng</p>
          <p>Sự đa dạng và Cảm giác thân thuộc</p>
          <p>Tiện nghi phù hợp với người có nhu cầu đặc biệt</p>
          <p>Đối tác liên kết Airbnb</p>
          <p>Đón tiếp người tị nạn Afghanistan</p>
          <p>Lượt giới thiệu của khách</p>
          <p>Airbnb.org</p>
        </div>
        <div className="w-1/4">
          <p className="font-bold uppercase">Đón tiếp khách</p>
          <p>Cho thuê nhà</p>
          <p>Tổ chức Trải nghiệm trực tuyến</p>
          <p>Tổ chức trải nghiệm</p>
          <p>Đón tiếp khách có trách nhiệm</p>
          <p>Trung tâm tài nguyên</p>
          <p>Trung tâm cộng đồng</p>
        </div>
        <div className="w-1/4">
          <p className="font-bold uppercase">Hỗ trợ</p>
          <p>Biện pháp ứng phó với đại dịch COVID-19 của chúng tôi</p>
          <p>Trung tâm trợ giúp</p>
          <p>Các tùy chọn hủy</p>
          <p>Hỗ trợ khu dân cư</p>
          <p>Tin cậy và an toàn</p>
        </div>
      </div>
      <hr />
      <div className="py-6 flex justify-between text-base">
        <div className="cursor-pointer">
          © 2021 Airbnb, Inc. · Quyền riêng tư · Điều khoản · Sơ đồ trang web
        </div>
        <div className="flex justify-end items-center gap-5 font-medium">
          <div className="flex justify-center items-center gap-2">
            <GlobalOutlined className="cursor-pointer" />
            <span className="underline cursor-pointer">Tiếng Việt (VN)</span>
          </div>
          <div className="flex justify-center items-center gap-2">
            <span className="font-normal cursor-pointer">$</span>
            <span className="underline cursor-pointer">USD</span>
          </div>
          <div className="flex justify-end items-center gap-5 ml-10">
            <FacebookOutlined className="text-xl cursor-pointer" />
            <TwitterOutlined className="text-xl cursor-pointer" />
            <InstagramOutlined className="text-xl cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
