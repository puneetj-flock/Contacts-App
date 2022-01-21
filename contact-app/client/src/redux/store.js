import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contacts";
import menuReducer from "./menu";
import sessionTokenReducer from "./sessionToken";
export default configureStore({
  reducer: {
    menu: menuReducer,
    sessionToken: sessionTokenReducer,
    contacts: contactsReducer,
  },
});
