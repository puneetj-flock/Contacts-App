export class APIManager {
  
  static async request(url, method, body, isPostAuth = false, isJSON = false) {
    let headers = new Headers();
    if (isPostAuth) {
      const sessionToken = localStorage.getItem("sessionToken");
      headers.append("sessionToken", sessionToken);
    }
    if (isJSON) {
      headers.append("Content-Type", "application/json");
    }
    return fetch(url, {
      method: method,
      headers: headers,
      body: body,
    }).then((data) => {
      if (data.status === 200) {
        const data_ = data.json();
        console.log("data_", data_);
        return data_; // TODO: Not all API return data
      }
    });
  }
}
