import { configureStore } from "@reduxjs/toolkit";
import { databaseReducer } from "./slices";

export const store = configureStore({
  reducer: {
    database: databaseReducer,
  },
});
