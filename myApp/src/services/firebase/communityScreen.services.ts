import axios from "axios";
import { LikeResponse, CommentResponse } from "../types/types";

export const likePost = async (
  postId: string,
  userId: string
): Promise<LikeResponse> => {
  const response = await axios.post(`/api/posts/${postId}/like`, { userId });
  return response.data;
};

export const commentOnPost = async (
  postId: string,
  userId: string,
  comment: string
): Promise<CommentResponse> => {
  const response = await axios.post(`/api/posts/${postId}/comment`, {
    userId,
    comment,
  });
  return response.data;
};
