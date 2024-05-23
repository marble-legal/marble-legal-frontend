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
  checkEmail: (email: string) => {
    return apiClient.post(`/auth/validate-field`, {
      value: email,
      fieldType: "email",
    });
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
  askQuery: (data: { message: string }) => {
    return apiClient.post("/conversations", data);
  },
  getAllConversations: () => {
    return apiClient.get("/conversations");
  },
  updateConversation: (
    conversationId: string,
    data: { likeStatus: number }
  ) => {
    const url = `/conversations/${conversationId}`;
    return apiClient.patch(url, data);
  },
};
