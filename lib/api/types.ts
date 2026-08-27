export type ApiErrorResponse = {
  error: {
    code: string;
    details?:
      | Array<{ field: string; message: string }>
      | {
          attemptsRemaining?: number;
          canResend?: boolean;
          resendAvailableAt?: string;
          retryAfterSeconds?: number;
        };
    message: string;
  };
  success: false;
};

export type AuthenticatedClient = {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  role: "client";
  status: "active";
};

export type ClientTokenPair = {
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
};

export type ClientLoginResponse = {
  data: {
    client: AuthenticatedClient;
  };
  message: string;
  success: true;
};

export type BackendClientSessionResponse = {
  data: {
    client: AuthenticatedClient;
    tokens: ClientTokenPair;
  };
  message: string;
  success: true;
};

export type OtpDelivery = {
  email: string;
  expiresAt: string;
  resendAvailableAt: string;
};

export type ClientRegistrationResponse = {
  data: {
    client: {
      email: string;
      firstName: string;
      id: string;
      status: "pending_verification";
    };
    otp: OtpDelivery;
  };
  message: string;
  success: true;
};

export type VerifyOtpResponse = {
  data: {
    client: {
      email: string;
      firstName: string;
      id: string;
      status: "active";
    };
    verifiedAt: string;
  };
  message: string;
  success: true;
};

export type ResendOtpResponse = {
  data: { otp: OtpDelivery };
  message: string;
  success: true;
};
