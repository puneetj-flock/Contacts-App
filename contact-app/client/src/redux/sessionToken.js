import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};
export const sessionTokenSlice = createSlice({
  name: "sessionToken",
  initialState,
  reducers: {
    setSessionToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("sessionToken", action.payload);
    },
  },
});

export const { setSessionToken } = sessionTokenSlice.actions;
export default sessionTokenSlice.reducer;
