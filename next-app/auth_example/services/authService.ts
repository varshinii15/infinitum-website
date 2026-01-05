import api from './api';

// Types
export interface SendVerificationEmailRequest {
  email: string;
}

export interface VerifyEmailResponse {
  message: string;
  email: string;
}

export interface RegisterUserRequest {
  email: string;
  password: string;
  name: string;
  phone: string;
  college: string;
  department: string;
  year: number;
  source: 'email' | 'google';
  referral?: string;
  accomodation: boolean;
  discoveryMethod: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: {
    uniqueId: string;
    email: string;
    name: string;
    verified: boolean;
  };
  accessToken: string;
  refreshToken: string;
}

export interface UserProfile {
  uniqueId: string;
  email: string;
  name: string;
  phone: string;
  college: string;
  department: string;
  year: number;
  isPSGStudent: boolean;
  referral?: string;
  accomodation: boolean;
  profilePhoto?: string;
  verified: boolean;
  generalFeePaid: boolean;
  discoveryMethod: string;
  source: string;
  lastVisited: Date;
  idCardUrl?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

// API Functions
export const authService = {
  // Send email verification
  sendVerificationEmail: async (data: SendVerificationEmailRequest) => {
    const response = await api.post('/api/auth/user/verify-email', data);
    return response.data;
  },

  // Verify email with token
  verifyEmail: async (token: string): Promise<VerifyEmailResponse> => {
    const response = await api.get(`/api/auth/user/verify-email/${token}`);
    return response.data;
  },

  // Register user
  register: async (data: RegisterUserRequest): Promise<AuthResponse> => {
    const response = await api.post('/api/auth/user/register', data);
    return response.data;
  },

  // Login user
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/api/auth/user/login', data);
    return response.data;
  },

  // Logout user
  logout: async () => {
    const response = await api.post('/api/auth/user/logout');
    return response.data;
  },

  // Get user profile
  getProfile: async (): Promise<{ user: UserProfile }> => {
    const response = await api.get('/api/auth/user/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (data: Partial<UserProfile>) => {
    const response = await api.put('/api/auth/user/profile', data);
    return response.data;
  },

  // Forgot password
  forgotPassword: async (data: ForgotPasswordRequest) => {
    const response = await api.post('/api/auth/user/forgot-password', data);
    return response.data;
  },

  // Reset password
  resetPassword: async (data: ResetPasswordRequest) => {
    const response = await api.post('/api/auth/user/reset-password', data);
    return response.data;
  },

  // Google login
  loginGoogle: async (data: { email: string; googleId: string; existing_user: boolean }) => {
    const response = await api.post('/api/auth/user/login-google', data);
    return response.data;
  },
};
