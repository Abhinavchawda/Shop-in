import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: ""
};

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        updateSearch(state, action) {
            state.search = action.payload;
        }
    }
});

export const { updateSearch } = searchSlice.actions;

export const selectSearch = (state) => (state.search);

export default searchSlice.reducer;