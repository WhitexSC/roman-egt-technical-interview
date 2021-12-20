import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import usersReducer from "../reducers/users/usersSlice";
import postsReducer from "../reducers/posts/postsSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
