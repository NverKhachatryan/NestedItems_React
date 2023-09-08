// fileSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: [],
};

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    addFile: (state, action) => {
      state.files.push({ id: Date.now(), text: action.payload });
    },
    renameFile: (state, action) => {
        state.files = state.files.filter((file) => file.name === action.payload);
    },
    deleteFile: (state, action) => {
      state.files = state.files.filter((file) => file.id !== action.payload);
    },
  },
});

export const { addFile, renameFile, deleteFile } = fileSlice.actions;

export default fileSlice.reducer;
