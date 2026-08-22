export const AUTH_PATTERNS = {
  REQUEST_OTP: "auth.otp.request",
  VERIFY_OTP: "auth.otp.verify",
  REFRESH_TOKEN: "auth.token.refresh",
  CREATE_CUSTOMER: "auth.customer.create",
} as const;

export interface CreateCustomerRequest {
  email: string;
  firstName: string;
  lastName?: string;
  phone?: string;
}

export interface CreateCustomerResponse {
  id: string;
  email: string;
  phone: string | null;
  firstName: string;
  lastName: string | null;
  role: string;
  status: string;
  createdAt: string;
}

export interface RequestOtpRequest {
  phone: string;
}

export interface RequestOtpResponse {
  success: boolean;
  expiresAt: string;
}

export interface VerifyOtpRequest {
  phone: string;
  code: string;
}

export interface VerifyOtpResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
