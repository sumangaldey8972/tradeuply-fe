export const API_ENDPOINTS = {
  backend: {
    clientLogin: "/client/login",
    clientLogout: "/client/logout",
    clientMe: "/client/me",
    clientRegistration: "/client/signup",
    clientTokenRefresh: "/client/token/refresh",
    resendOtp: "/client/otp/resend",
    verifyOtp: "/client/otp/verify",
  },
  client: {
    clientLogin: "/api/client/login",
    clientLogout: "/api/client/logout",
    clientRegistration: "/api/client/signup",
    clientSession: "/api/client/session",
    clientTokenRefresh: "/api/client/token/refresh",
    resendOtp: "/api/client/otp/resend",
    verifyOtp: "/api/client/otp/verify",
  },
} as const;
