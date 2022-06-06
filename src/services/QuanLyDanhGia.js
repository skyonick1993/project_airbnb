import BaseService from "./BaseService";

class QuanLyDanhGia extends BaseService {
  constructor(props) {
    super();
  }

  layDsDanhGia = (roomId) => {
    return this.get(`/api/reviews/byRoom?roomId=${roomId}`);
  };
}

const quanLyDanhGia = new QuanLyDanhGia();

export default quanLyDanhGia;
