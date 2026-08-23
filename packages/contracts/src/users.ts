export const USER_PATTERNS = {
  GET: "users.get",
  ME: "user.me",
} as const;

export interface GetUserRequest {
  userId: string;
}

export interface GetCurrentUserRequest {
  userId: string;
}
