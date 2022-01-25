import {
  CHECK_AUTH,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  GET,
  POST,
} from "../service/constants";

import { APIManager } from "../api/APIManager";

export class AuthService {

  static checkAuth() {
    return APIManager.request(CHECK_AUTH, GET, null, true, true).then((res) => {
      const resp = res;
      sessionStorage.setItem("name", resp.name);
      return resp.userId;
    });
  }

  static registerUser(user) {
    return APIManager.request(REGISTER_USER, POST, JSON.stringify(user), false, true).then((res) => {
      const resp = res;
      localStorage.setItem("sessionToken", resp.sessionToken);
      let sessionStorage = window.sessionStorage;
      sessionStorage.setItem("name", resp.name);
    });
  }

  static loginUser(user) {
    return APIManager.request(LOGIN_USER, POST, JSON.stringify(user), false, true).then((res) => {
      const resp = res;
      localStorage.setItem("sessionToken", resp.sessionToken);
      let sessionStorage = window.sessionStorage;
      sessionStorage.setItem("name", resp.name);
    });
  }

  static logoutUser() {
    return APIManager.request(LOGOUT_USER, GET, null, true, false, false).then(() => {
      localStorage.removeItem("sessionToken");
      let sessionStorage = window.sessionStorage;
      sessionStorage.removeItem("name");
    });
  }
}