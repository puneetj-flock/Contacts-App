import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contacts";
import menuReducer from "./menu";
import sessionTokenReducer from "./sessionToken";
import selectedContactReducer from "./selectedContact";
import searchTextReducer from "./searchText";
export default configureStore({
  reducer: {
    menu: menuReducer,
    sessionToken: sessionTokenReducer,
    contacts: contactsReducer,
    selectedContact: selectedContactReducer,
    searchText: searchTextReducer,
  },
});
