export type ScreenState =
  | "onboarding"
  | "welcome"
  | "login"
  | "forgotPassword"
  | "register"
  | "info"
  | "chatbot"
  | "security"
  | "home"
  | "community"
  | "settings";

export type ForgotPasswordStage = "mail" | "otp" | "changed" | "successful";

export type SecurityScreenType =
  | "features"
  | "sosBtn"
  | "safetyTimer"
  | "incidentReporting";

export interface UserSession {
  isLoggedIn: boolean;
  token: string;
}

export interface User {
  id: number;
  name: string;
  profilePhoto: string;
  shortDescritption: string;
}

export interface Comment {
  id: string;
  user: User;
  comment: string;
  createdAt: string;
  postID: string;
}

export interface Post {
  id: string;
  user: User;
  postDescription: string;
  postImage: string;
  likes: number;
  comments: Comment[];
  createdAt: string;
  tags: string[];
}

export interface LikeResponse {
  postId: string;
  userId: string;
}

export interface CommentResponse {
  postId: string;
  comment: Comment;
}

export interface SecurityScreenData {
  isSOSButtonEnabled: number;
  isSafetyTimerEnabled: number;
  safetyTimerTimeInterval: string;
  sosButtonContacts: string;
  safetyTimerContacts: string;
}
