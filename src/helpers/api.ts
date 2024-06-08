import { boolean } from "yup";
import apiClient from "./client";
const apiURLEndpoint = process.env.REACT_APP_API_URL;

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
  getAllConversations: (userId: string, contractId?: string) => {
    let url = `/conversations?userId=${userId}`;
    if (contractId) {
      url += `&contractId=${contractId}`;
    }
    return apiClient.get(url);
  },
  updateConversation: (
    conversationId: string,
    data: { likeStatus: number }
  ) => {
    const url = `/conversations/${conversationId}`;
    return apiClient.patch(url, data);
  },
  getUser: ({ id }: { id: string }) => {
    return apiClient.get(`/users/${id}`);
  },
  queryContract: (id: string, data: { message: string }) => {
    const url = `/contracts/${id}/query`;
    return apiClient.post(url, data);
  },
  getContracts: (userId: string, isGenerated: boolean) => {
    return apiClient.get(
      `/contracts?userId=${userId}&isGenerated=${isGenerated}`
    );
  },
  deleteContract: (id: string) => {
    return apiClient.delete(`/contracts/${id}`);
  },
  // multipart/form-data
  uploadFile: (id: string, data: FormData) => {
    const url = `users/${id}/contracts`;
    return fetch(`${apiURLEndpoint}${url}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
      body: data,
    });
  },
  createContract: (data: any) => {
    return apiClient.post("/contracts", data);
  },
};
