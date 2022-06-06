import BaseService from "./BaseService";

class QuanLyUser extends BaseService {
  constructor(props) {
    super();
  }

  layThongTinChiTietUser = (userId) => {
    return this.get(`/api/users/${userId}`);
  };

  capNhatAvatarUser = (formData) => {
    return this.post("/api/users/upload-avatar", formData);
  };
}

const quanLyUser = new QuanLyUser();
export default quanLyUser;
