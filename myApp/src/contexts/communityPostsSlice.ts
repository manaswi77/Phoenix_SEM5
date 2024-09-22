import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../types/types";
import { LikeResponse, CommentResponse } from "../types/types";
import { likePost, commentOnPost } from "../services/communityPostService";

// Define the state type
interface CommunityPostStateType {
  posts: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  offset: number;
  hasMorePosts: boolean;
}

// Define the initial state
const initialState: CommunityPostStateType = {
  posts: [],
  status: "idle",
  error: null,
  offset: 0,
  hasMorePosts: true,
};

// Async thunk for liking a post
export const likePostAsync = createAsyncThunk<
  LikeResponse,
  { postId: string; userId: string }
>("communityPost/likePost", async ({ postId, userId }, { rejectWithValue }) => {
  try {
    return await likePost(postId, userId);
  } catch (error) {
    return rejectWithValue("Failed to like post");
  }
});

// Async thunk for commenting on a post
export const commentOnPostAsync = createAsyncThunk<
  CommentResponse,
  { postId: string; userId: string; comment: string }
>(
  "communityPost/commentOnPost",
  async ({ postId, userId, comment }, { rejectWithValue }) => {
    try {
      return await commentOnPost(postId, userId, comment);
    } catch (error) {
      return rejectWithValue("Failed to comment on post");
    }
  }
);

// Async thunk for fetching posts
export const fetchCommunityPosts = createAsyncThunk<Post[], number>(
  "communityPosts/fetchPosts",
  async (offset, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/posts?offset=${offset}&limit=10`);
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      return (await response.json()) as Post[];
    } catch (error) {
      return rejectWithValue("Failed to fetch posts");
    }
  }
);

const communityPostSlice = createSlice({
  name: "communityPost",
  initialState,
  reducers: {
    resetPosts: (state) => {
      state.posts = [];
      state.offset = 0;
      state.hasMorePosts = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetching posts
      .addCase(fetchCommunityPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchCommunityPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.status = "succeeded";
          state.posts.push(...action.payload);
          if (action.payload.length < 10) {
            state.hasMorePosts = false; // No more posts to load
          }
        }
      )
      .addCase(fetchCommunityPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch posts";
      })

      // Handle liking a post
      .addCase(
        likePostAsync.fulfilled,
        (state, action: PayloadAction<LikeResponse>) => {
          const post = state.posts.find((p) => p.id === action.payload.postId);
          if (post) {
            post.likes += 1;
          }
        }
      )
      .addCase(likePostAsync.rejected, (state, action) => {
        state.error = action.error.message || "Failed to like post";
      })

      // Handle commenting on a post
      .addCase(
        commentOnPostAsync.fulfilled,
        (state, action: PayloadAction<CommentResponse>) => {
          const post = state.posts.find((p) => p.id === action.payload.postId);
          if (post) {
            post.comments.push(action.payload.comment);
          }
        }
      )
      .addCase(commentOnPostAsync.rejected, (state, action) => {
        state.error = action.error.message || "Failed to comment on post";
      });
  },
});

// Export actions and reducer
export const { resetPosts } = communityPostSlice.actions;
export default communityPostSlice.reducer;
