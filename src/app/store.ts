import { configureStore } from '@reduxjs/toolkit';

import dashboardRouteReducer from '../features/dashboard/dashboardRouteSlice';

export const store = configureStore({
  reducer: {
    dashboardRoute: dashboardRouteReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
