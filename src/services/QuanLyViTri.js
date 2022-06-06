import BaseService from "./BaseService";

class QuanLyViTri extends BaseService {
  constructor(props) {
    super();
  }

  layDsViTri = () => {
    return this.get("/api/locations");
  };
}

const quanLyViTri = new QuanLyViTri();

export default quanLyViTri;
