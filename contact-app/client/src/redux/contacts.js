import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
};
export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    // [... state.contacts, action.payload]: (state, action) => {
    // addContact: (state, action) => {
    //   state.contacts.push(action.payload);
    // } 
    // setUpdatedContact: (state, action)
  },
});

export const { setContacts } = contactsSlice.actions;
export default contactsSlice.reducer;
