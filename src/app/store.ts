import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counter";
import authSlice from "./slices/auth";
import { meetingsSlice } from "./slices/meeting/meetingsSlice";


export const store = configureStore({
  reducer: {
    counter: counterSlice,
    auth: authSlice,
    meetings: meetingsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
