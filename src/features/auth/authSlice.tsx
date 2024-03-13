import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { jwtDecode } from "jwt-decode";
interface initialStateProps {
  id: string | null;
  accessToken: string | null;
}
const initialState: initialStateProps = {
  id: null,
  accessToken: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
      const decoded: { userInfo: { id: string } } =
        accessToken && jwtDecode(accessToken);
      state.id = decoded?.userInfo.id;
    },
    logout: (state) => {
      state.id = null;
      state.accessToken = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state: RootState) => state.auth.accessToken;
export const selectCurrentId = (state: RootState) => state.auth.id;
