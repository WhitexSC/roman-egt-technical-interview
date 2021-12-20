import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./usersAPI";

const initialState: UsersState = {
  users: null,
};

export const getUsers = createAsyncThunk("users/fetchUsers", async () => {
  const data = await fetchUsers();
  return data;
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.users = payload;
    });
  },
});

export default usersSlice.reducer;
