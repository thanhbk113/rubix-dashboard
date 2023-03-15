import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

interface initialStateDashboardRoute {
  activeLabel: string;
  isSlide: boolean;
  isShow: boolean;
}

const initialState: initialStateDashboardRoute = {
  activeLabel: "",
  isSlide: true,
  isShow: true,
};

const dashboardRouteSlice = createSlice({
  name: "dashboardRoute",
  initialState: initialState,
  reducers: {
    alo1234: (state, action) => {
      state.activeLabel = action.payload;
    },

    handleSlide: (state) => {
      state.isSlide = !state.isSlide;
      console.log(state.isSlide);
    },

    handleShow: (state) => {
      state.isShow = !state.isShow;
    },

    openShow: (state) => {
      state.isShow = true;
    },
  },
});

export const selectIndexActive = (state: RootState) => state.dashboardRoute.activeLabel;
export const selectIsSlide = (state: RootState) => state.dashboardRoute.isSlide;
export const selectIsShow = (state: RootState) => state.dashboardRoute.isShow;

export const { alo1234, handleSlide, handleShow } = dashboardRouteSlice.actions;

export default dashboardRouteSlice.reducer;
