export class APIManager {
  static async request(url, method, body, isPostAuth = false, isJSON = false, haveResponse = true) {
    let headers = new Headers();
    if (isPostAuth) {
      const sessionToken = localStorage.getItem("sessionToken");
      headers.append("sessionToken", sessionToken);
    }
    if (isJSON) {
      headers.append("Content-Type", "application/json");
    }
    return await fetch(url, {
      method: method,
      headers: headers,
      body: body,
    }).then((data) => {
      if(data.status === 400) {
        alert("Bad Request");
      } else if (data.status === 401) {
        alert("Token Expired");
      } else if (data.status === 403) {
        alert("Forbidden");
      } else if(data.status === 404) {
        alert("Not Found");
      } else if (data.status === 500) {
        alert("Internal Server Error");
      }
      if (haveResponse) {
        return data.json();
      }
    });
  }
}
