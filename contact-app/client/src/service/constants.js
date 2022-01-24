// export const GET_CONTACTS = "http://localhost:8080/getContacts";
// export const ADD_CONTACT = "http://localhost:8080/addContact";
// export const UPDATE_CONTACT = "http://localhost:8080/updateContact";
// export const DELETE_CONTACT = "http://localhost:8080/deleteContact";
// export const CHECK_AUTH = "http://localhost:8080/checkAuth";
// export const REGISTER_USER = "http://localhost:8080/register";
// export const LOGIN_USER = "http://localhost:8080/login";
// export const LOGOUT_USER = "http://localhost:8080/logout";

export const GET = "GET";
export const POST = "POST";
export const PUT = "PUT";
export const DELETE = "DELETE";

const BASE_URL = "http://localhost:8080/";

export const GET_CONTACTS = BASE_URL + "contact/get";
export const ADD_CONTACT = BASE_URL + "contact/add";
export const UPDATE_CONTACT = BASE_URL + "contact/update";
export const DELETE_CONTACT = BASE_URL + "contact/delete";
export const REGISTER_USER = BASE_URL + "auth/register";
export const LOGIN_USER = BASE_URL + "auth/login";
export const LOGOUT_USER = BASE_URL + "auth/logout";
export const CHECK_AUTH = BASE_URL + "auth/checkAuth";
