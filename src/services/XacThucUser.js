import BaseService from "./BaseService";

class XacThucUser extends BaseService {
  constructor(props) {
    super();
  }

  dangKy = (formValue) => {
    return this.post("/api/auth/register", formValue);
  };

  dangNhap = (formValue) => {
    return this.post("/api/auth/login", formValue);
  };
}

const xacThucUser = new XacThucUser();
export default xacThucUser;
