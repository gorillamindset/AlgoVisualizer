import { configureStore } from "@reduxjs/toolkit";
import { gridSlice } from "./gridSlice";

export const Store = configureStore({
  reducer: { grid: gridSlice.reducer },
});
