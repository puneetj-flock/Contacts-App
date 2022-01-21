import React from "react";
import { useSelector } from "react-redux";
import { setSessionToken } from "../redux/sessionToken";

// const sessionToken = useSelector((state) => state.sessionToken.token);

export const getContacts = (url, sessionToken) => {
  // const ses_tok = localStorage.getItem("sessionToken");
  return fetch(url, {
    method: "GET",
    headers: {
      sessionToken: sessionToken,
    },
  }).then((data) => {
    if (data.status === 401) {
      throw new Error("Token Expired");
    } else {
      return data.json();
    }
  });
};

export const addContact = (url, sessionToken, contact) => {
  console.log(contact);
  return fetch(url, {
    method: "POST",
    headers: {
      sessionToken: sessionToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  }).then((data) => {
    if (data.status === 402) {
      throw new Error("Token Expired");
    } else {
      return data.json();
    }
  });
};

export const updateContact = (url, sessionToken, contact) => {
  return fetch(url, {
    method: "PUT",
    headers: {
      sessionToken: sessionToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  }).then((data) => {
    if (data.status === 402) {
      throw new Error("Token Expired");
    } else {
      return data.json();
    }
  });
};

export const deleteContact = (url, sessionToken, contactId) => {
  return fetch(url + "/" + toString(contactId), {
    method: "DELETE",
    headers: {
      sessionToken: sessionToken,
      "Content-Type": "application/json",
    },
  }).then((data) => {
    if (data.status === 402) {
      throw new Error("Token Expired");
    } else {
      return data.json();
    }
  });
};

export const registerUser = (url, user) => {
  return fetch(url, {
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
};

export const loginUser = (url, user) => {
  return fetch(url, {
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
};

export const logoutUser = (url, sessionToken) => {
  return fetch(url, {
    method: "GET",
    headers: {
      sessionToken: sessionToken,
      "Content-Type": "application/json",
    },
  }).then((data) => {
    if (data.status === 402) {
      throw new Error("Token Expired");
    } else {
      return data.json();
    }
  });
};

export const fn = async () => {
  const contact = {
    name: "Prashant",
    email: "asdfdsafbc@gmail.com",
  };

  const ans = await fetch("http://localhost:8080/addContact", {
    method: "post",
    headers: {
      sessionToken: "o0lAAyqvs10SN0vOuZ5Mn5rHe8_5U1IE",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  console.log(ans.json());
};

// export const fn2 = () => {
//   let arr;
//   const test = fetch("http://localhost:8080/getContacts", {
//     method: "GET",
//     headers: {
//       sessionToken: "o0lAAyqvs10SN0vOuZ5Mn5rHe8_5U1IE",
//     },
//   })
//     .then((data) => {
//       return data.json();
//     })
//     .then((res) => {
//       arr = res;
//       return res;
//     });

// console.log(test);
// var myHeaders = new Headers();
// myHeaders.append("sessionToken", "o0lAAyqvs10SN0vOuZ5Mn5rHe8_5U1IE");

// var requestOptions = {
//   method: "GET",
//   headers: myHeaders,
//   redirect: "follow",
// };

// fetch("http://localhost:8080/getContacts", requestOptions)
//   .then((response) => response.json())
//   .then((result) => console.log(result))
//   .catch((error) => console.log("error", error));
