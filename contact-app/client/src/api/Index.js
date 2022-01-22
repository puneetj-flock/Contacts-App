import {
  ADD_CONTACT,
  DELETE_CONTACTS,
  GET_CONTACTS,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  UPDATE_CONTACT,
} from "./contants";
// const sessionToken = useSelector((state) => state.sessionToken.token);

export class ApiManager {
  constructor() {
    this.sessionToken = localStorage.getItem("sessionToken");
  }

  async getContacts() {
    return await fetch(GET_CONTACTS, {
      method: "GET",
      headers: {
        sessionToken: this.sessionToken,
      },
    }).then((data) => {
      if (data.status === 401) {
        throw new Error("Token Expired");
      } else {
        return data.json();
      }
    });
  }

  async addContact(contact) {
    const data_1 = await fetch(ADD_CONTACT, {
      method: "POST",
      headers: {
        sessionToken: this.sessionToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });
    if (data_1.status === 402) {
      throw new Error("Token Expired");
    } else {
      return data_1.json();
    }
  }

  async updateContact(contact) {
    const data = await fetch(UPDATE_CONTACT, {
      method: "PUT",
      headers: {
        sessionToken: this.sessionToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });
    if (data.status === 401) {
      throw new Error("Token Expired");
    }
  }
  // if (data.status === 402) {
  //   throw new Error("Token Expired");
  // } else {
  //   console.log("data.json()");
  //   const data_1 = data.json();
  //   console.log(data_1);
  //   return data_1;
  // }

  async deleteContact(contactId) {
    const data = await fetch(DELETE_CONTACTS + "/" + toString(contactId), {
      method: "DELETE",
      headers: {
        sessionToken: this.sessionToken,
        "Content-Type": "application/json",
      },
    });
    if (data.status === 402) {
      throw new Error("Token Expired");
    } else {
      return data.json();
    }
  }

  async registerUser(user) {
    const data = await fetch(REGISTER_USER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (data.status === 402) {
      throw new Error("Token Expired");
    } else {
      return data.text();
    }
  }

  async loginUser(user) {
    return await fetch(LOGIN_USER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((data) => {
      if (data.status === 402) {
        throw new Error("Token Expired");
      } else {
        return data.text();
      }
    });
  }

  async logoutUser() {
    const data = await fetch(LOGOUT_USER, {
      method: "GET",
      headers: {
        sessionToken: this.sessionToken,
        "Content-Type": "application/json",
      },
    });
    if (data.status === 402) {
      throw new Error("Token Expired");
    }
  }
}
