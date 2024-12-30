import { createSlice } from "@reduxjs/toolkit";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  addUserToLocalStorage
} from "../../utils/localStorage";


const initialState = {
  user: getUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
      addUserToLocalStorage(payload);
    },
    logoutUser: (state, { payload }) => {
      state.user = null;
      removeUserFromLocalStorage("user");
    },
  }
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
