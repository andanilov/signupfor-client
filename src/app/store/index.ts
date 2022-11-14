import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import eventSlice from './eventSlice';

const rootReducer = combineReducers({
  authSlice,
  eventSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
