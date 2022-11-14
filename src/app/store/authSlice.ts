import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import IUser from '../models/IUser';
import AuthService from '../services/AuthService';
import StorageService from '../services/StorageService';
import { RootState } from '.';

export type TUserState = IUser | null | undefined;
export interface IauthInitState {
  user: TUserState, // undefined - loading check auth, null - guest, IUser - user
}

// --- Async actions
export const checkAuth = createAsyncThunk(
  'authSlice/checkAuth',
  async () => {
    const userData = await AuthService.checkAuth();
    StorageService.setAccesToken(userData.accessToken);
    return userData.user || null;
  },
);

const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    user: undefined,
  } as IauthInitState,

  reducers: {
    setUser: (state: IauthInitState, action: PayloadAction<IUser>) => { state.user = action.payload; },
    removeUser: (state: IauthInitState) => { state.user = null; },
  },
  // --- Async actions handlers
  extraReducers: (builder) => {
    builder.addCase(checkAuth.fulfilled, (state, { payload }) => { state.user = payload; });
    builder.addCase(checkAuth.rejected, (state) => { state.user = null; });
  },
});

export default authSlice.reducer;
export const { setUser, removeUser } = authSlice.actions;

// Selectors
export const getCurrentUser = () => (state: RootState) => state.authSlice.user;
