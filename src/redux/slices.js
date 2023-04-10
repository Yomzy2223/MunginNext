import { createSlice } from "@reduxjs/toolkit";

const database = createSlice({
  name: "cropInfo",
  initialState: {
    selectedCrop: {},
    cropDetails: {},
    selectedCropDetails: {},
    title: "",
  },
  reducers: {
    storeSelectedCrop: (state, action) => {
      state.selectedCrop = action.payload;
    },
    storeTitle: (state, action) => {
      state.title = action.payload;
    },
    storeCropDetails: (state, action) => {
      state.cropDetails = action.payload;
    },
    storeSelectedCropDetails: (state, action) => {
      state.selectedCropDetails = action.payload;
    },
  },
});

export const databaseReducer = database.reducer;
export const {
  // storeSelectedCrop,
  storeTitle,
  storeCropDetails,
  // storeSelectedCropDetails,
} = database.actions;
