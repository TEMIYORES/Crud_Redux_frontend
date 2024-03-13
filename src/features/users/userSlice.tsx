import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface initialStateProps {
  username: string | null;
}
const initialState: initialStateProps = {
  username: null,
};
const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { username } = action.payload;
      state.username = username;
    },
    clearUserInfo: (state) => {
      state.username = null;
    },
  },
});

export const { setCredentials, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
export const selectUsername = (state: RootState) => state.userInfo.username;
