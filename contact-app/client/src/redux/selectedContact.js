import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedContact: {
    id: 0,
    name: "",
    contact: "",
    email: "",
    address: "",
    score: 0,
  }
};
export const selectedContactSlice = createSlice({
  name: "selectedContact",
  initialState,
  reducers: {
    setSelectedContact: (state, action) => {
      console.log("CLICK");
      state.selectedContact = action.payload;
    },
  },
});

export const { setSelectedContact } = selectedContactSlice.actions;
export default selectedContactSlice.reducer;
