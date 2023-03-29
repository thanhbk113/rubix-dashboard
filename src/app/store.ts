import { configureStore } from '@reduxjs/toolkit';

import dashboardRouteSlice from '@/features/dashboard/dashboardRouteSlice';
import uploadSlice from '@/features/uploadImage';

export const store = configureStore({
  reducer: {
    upload: uploadSlice,
    dashboardRoute: dashboardRouteSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
