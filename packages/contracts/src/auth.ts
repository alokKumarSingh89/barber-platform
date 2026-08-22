export const AUTH_PATTERNS = {
  CREATE_CUSTOMER: "auth.customer.create",
} as const;

export interface CreateCustomerRequest {
  email: string;
  firstName: string;
  lastName?: string;
  phone?: string;
}
