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
    // return await fetch(CHECK_AUTH, {
    //     method: "GET",
    //     headers: myHeaders,
    // }).then((data) => {
    //     console.log("GOT HERE", data);
    //     if (data.status === 200) {
    //         return data.text();
    //     }
    //     localStorage.removeItem("sessionToken");
    //     return 0;
    // }).catch((err) => {
    //     localStorage.removeItem("sessionToken");
    //     return 0;
    // });
  }

  static registerUser(user) {
    return APIManager.request(REGISTER_USER, POST, JSON.stringify(user), false, true).then((res) => {
      const resp = res;
      localStorage.setItem("sessionToken", resp.sessionToken);
      let sessionStorage = window.sessionStorage;
      sessionStorage.setItem("name", resp.name);
    });

    // let myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // return await fetch(REGISTER_USER, {
    //     method: "POST",
    //     headers: myHeaders,
    //     body: JSON.stringify(user),
    // }).then((data) => {
    //     if (data.status === 401) {
    //         throw new Error("Token Expired");
    //     } else {
    //         return data.text();
    //     }
    // });
  }

  static loginUser(user) {
    return APIManager.request(LOGIN_USER, POST, JSON.stringify(user), false, true).then((res) => {
      const resp = res;
      localStorage.setItem("sessionToken", resp.sessionToken);
      let sessionStorage = window.sessionStorage;
      sessionStorage.setItem("name", resp.name);
    });

    // let myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // return await fetch(LOGIN_USER, {
    //     method: "POST",
    //     headers: myHeaders,
    //     body: JSON.stringify(user),
    // }).then((data) => {
    //     if (data.status === 401) {
    //         throw new Error("Token Expired");
    //     } else {
    //         return data.text();
    //     }
    // });
  }

  static logoutUser() {
    return APIManager.request(LOGOUT_USER, GET, null, true, false, false).then(() => {
      localStorage.removeItem("sessionToken");
      let sessionStorage = window.sessionStorage;
      sessionStorage.removeItem("name");
    });
    // let myHeaders = new Headers();
    // myHeaders.append("sessionToken", this.sessionToken);
    // myHeaders.append("Content-Type", "application/json"); // TODO: No need

    // return await fetch(LOGOUT_USER, {
    //     method: "GET",
    //     headers: myHeaders,
    // }).then((data) => {
    //     if (data.status === 401) {
    //         throw new Error("Token Expired");
    //     }
    // });
  }
}