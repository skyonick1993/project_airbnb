import BaseService from "./BaseService";

class QuanLyPhong extends BaseService {
  constructor(props) {
    super();
  }

  layDsPhong = (locationId) => {
    return this.get(`/api/rooms/`, locationId);
  };

  layThongTinChiTietPhong = (roomId) => {
    return this.get(`/api/rooms/${roomId}`);
  };

  datPhong = (bookingForm) => {
    return this.post("/api/rooms/booking", bookingForm);
  };
}

const quanLyPhong = new QuanLyPhong();

export default quanLyPhong;
