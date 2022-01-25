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
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    deleteStoreContact: (state, action) => {
      state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
    },
    updateContact: (state, action) => {
      state.contacts = state.contacts.filter((contact) => contact.id !== action.payload.id);
      state.contacts.push(action.payload);
    },
  },
});

export const { setContacts, addContact, deleteStoreContact, updateContact } = contactsSlice.actions;
export default contactsSlice.reducer;
