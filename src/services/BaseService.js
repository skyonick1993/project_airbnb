import axios from "axios";
import { DOMAIN, TOKEN_CYBERSOFT, USER_LOGIN_TOKEN } from "../util/config";

export default class BaseService {
  get = (url, id = "") => {
    return axios({
      method: "GET",
      url: DOMAIN + url,
      headers: {
        token: localStorage.getItem(USER_LOGIN_TOKEN),
        tokenByClass: TOKEN_CYBERSOFT,
      },
      params: {
        locationId: id,
      },
    });
  };

  put = (url) => {
    return axios({
      method: "PUT",
      url: DOMAIN + url,
      headers: {
        token: localStorage.getItem(USER_LOGIN_TOKEN),
        tokenByClass: TOKEN_CYBERSOFT,
      },
    });
  };

  post = (url, formValue) => {
    return axios({
      method: "POST",
      url: DOMAIN + url,
      data: formValue,
      headers: {
        token: localStorage.getItem(USER_LOGIN_TOKEN),
        tokenByClass: TOKEN_CYBERSOFT,
      },
    });
  };

  delete = (url) => {
    return axios({
      method: "DELETE",
      url: DOMAIN + url,
      headers: {
        token: localStorage.getItem(USER_LOGIN_TOKEN),
        tokenByClass: TOKEN_CYBERSOFT,
      },
    });
  };
}
