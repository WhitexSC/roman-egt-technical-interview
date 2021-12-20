import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { fetchPosts } from "./postsAPI";

const initialState: PostsState = {
  posts: null,
};

export const fetchPostsByUserId = createAsyncThunk(
  "users/fetchByIdStatus",
  async (userId: number) => {
    const data = await fetchPosts(userId);
    return { data, userId };
  },
  {
    condition: (userId, { getState }) => {
      const { posts } = getState() as { posts: PostsState };
      const isPostsInStore =
        posts.posts && posts.posts.some((post) => post.userId === userId);

      if (isPostsInStore) {
        return false;
      }
    },
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPosts: (state, action: PayloadAction<Array<Post>>) => {
      state.posts = state
        ? [...state.posts, ...action.payload]
        : action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostsByUserId.fulfilled, (state, action) => {
      const { userId, data } = action.payload;
      const { posts } = state;
      const isPostsInStore =
        posts && posts.some((post) => post.userId === userId);
      if (!isPostsInStore) {
        state.posts = state.posts ? [...state.posts, ...data] : data;
      }
    });
  },
});

export const { addPosts } = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;
