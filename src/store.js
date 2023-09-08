// configureStore.js

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./features/fileSlice";
import { localStorageMiddleware } from "./localStorageMiddleware"; // Import your localStorageMiddleware

// Load the state from localStorage
const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState, // Initialize with localStorage data
  middleware: (getDefaultMiddleware) => [
    localStorageMiddleware, // Add the localStorage middleware
    ...getDefaultMiddleware(),
  ],
});

export default store;
