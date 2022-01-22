import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchText: "", // TODO: better naming
};
export const searchTextSlice = createSlice({
  name: "searchText",
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const { setSearchText } = searchTextSlice.actions;
export default searchTextSlice.reducer;
