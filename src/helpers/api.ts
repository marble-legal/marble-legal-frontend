import apiClient from "./client";

export const api = {
  login: (data: any) => {
    return apiClient.post("/auth/login", {
      ...data,
      userType: "U",
    });
  },
  register: (data: any) => {
    return apiClient.post("/auth/register", data);
  },
  forgotPassword: (data: any) => {
    return apiClient.post("/auth/forgot-password", {
      email: data.email,
      resetPasswordUrl: window.location.origin + "/reset-password",
    });
  },
  resetPassword: (data: any) => {
    return apiClient.post("/auth/reset-password", data);
  },
};
