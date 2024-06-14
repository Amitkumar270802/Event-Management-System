import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: null,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLogin: (state, value) => {
      state.login = value.payload;
    },
    setToken: (state, value) => {
      state.token = value.payload;
    },
  },
});
export const { setLogin, setToken } = authSlice.actions;
export default authSlice.reducer;
