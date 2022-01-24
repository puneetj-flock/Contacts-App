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
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    deleteStoreContact: (state, action) => {
      console.log("redux deleteContact", action.payload);
      state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
    },
    updateContact: (state, action) => {
      console.log("redux updateContact", action.payload);
      state.contacts = state.contacts.filter((contact) => contact.id !== action.payload.id);
      state.contacts.push(action.payload);
    },
  },
});

export const { setContacts, addContact, deleteStoreContact, updateContact } = contactsSlice.actions;
export default contactsSlice.reducer;
