export const USER_PATTERNS = {
  GET: "users.get",
} as const;

export interface GetUserRequest {
  userId: string;
}
