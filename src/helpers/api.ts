import { boolean } from "yup";
import apiClient from "./client";
import { BusinessEntityCreation } from "../types/business-entity.types";
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
  queryContract: (id: string, data: { message: string }, signal?: any) => {
    const url = `/contracts/${id}/query`;
    return apiClient.post(url, data, { signal });
  },
  getContracts: (userId: string, isGenerated: boolean) => {
    return apiClient.get(
      `/contracts?userId=${userId}&isGenerated=${isGenerated}`
    );
  },
  searchContracts: (userId: string, data: any, signal?: any) => {
    let url = `/contracts?userId=${userId}`;
    if (data.isGenerated) {
      url += `&isGenerated=${data.isGenerated}`;
    }
    return apiClient.get(url, { signal }).then((res) => res.data);
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
  updateContract: (id: string, data: any) => {
    return apiClient.patch(`/contracts/${id}`, data);
  },
  getContract: (id: string) => {
    return apiClient.get(`/contracts/${id}`);
  },
  getUserSubscription: (userId: string) => {
    return apiClient
      .get(`/users/${userId}/subscriptions`)
      .then((res) => res.data);
  },
  customerStripePortal: (id: string) => {
    return apiClient
      .get(`/users/${id}/stripe-customer-portal-url`, {
        params: {
          // redirectUrl: "http://localhost:3002/dashboard",
          // dynamicRedirectUrl
          redirectUrl: window.location.origin + "/dashboard",
        },
      })
      .then((res) => res.data);
  },
  getStripe: ({
    id,
    redirectUrl,
    tier,
    planType,
    aiAssistant,
    contractAnalysis,
    contractDrafting,
    businessEntity,
    attorneyReview,
  }: {
    id: string;
    redirectUrl: string;
    tier: string;
    planType: string;
    aiAssistant?: number;
    contractAnalysis?: number;
    contractDrafting?: number;
    businessEntity?: number;
    attorneyReview?: number;
  }) => {
    let url = `/users/${id}/stripe-connect-url?redirectUrl=${redirectUrl}`;
    if (tier) {
      url += `&tier=${tier}`;
    }
    if (planType) {
      url += `&planType=${planType}`;
    }
    if (aiAssistant) {
      url += `&aiAssistant=${aiAssistant}`;
    }
    if (contractAnalysis) {
      url += `&contractAnalysis=${contractAnalysis}`;
    }
    if (contractDrafting) {
      url += `&contractDrafting=${contractDrafting}`;
    }
    if (businessEntity) {
      url += `&businessEntity=${businessEntity}`;
    }
    if (attorneyReview) {
      url += `&attorneyReview=${attorneyReview}`;
    }
    return apiClient.get(url).then((res) => res.data);
  },
  getSignedUrl: ({ id, data }: { id: string; data: any }) => {
    // /users/{id}/images/signed-url
    return apiClient.get(`/users/${id}/images/signed-url`, {
      params: data,
    });
  },
  editUser: (id: string, data: any) => {
    return apiClient.put(`/users/${id}`, data);
  },
  deleteUser: (id: string, password: string) => {
    return apiClient.delete(`/users/${id}`, {
      data: { password },
    });
  },
  initiateEmailUpdate: (id: string, email: string) => {
    return apiClient.post(`/users/${id}/email/update/initiate`, {
      email,
    });
  },
  verifyEmailUpdate: (id: string, otp: string) => {
    return apiClient.post(`/users/${id}/email/update`, {
      otp,
    });
  },
  changePassword: (id: string, data: any) => {
    return apiClient.patch(`/users/${id}/password`, data);
  },
  createEntity: (data: BusinessEntityCreation) => {
    return apiClient.post("/business-entities", data);
  },
  getEntities: ({ userId }) => {
    return apiClient.get(`/business-entities`, {
      params: {
        userId,
      },
    });
  },
  getEntity: (id: string) => {
    return apiClient.get(`/business-entities/${id}`);
  },
  deleteEntity: (id: string) => {
    return apiClient.delete(`/business-entities/${id}`);
  },
  getStripeUrl: (id: string, tier: "IN" | "SB" | "SP", planType: "M" | "Y") => {
    return apiClient.get(`/users/${id}/stripe-connect-url`, {
      params: {
        redirectUrl: `${window.location.origin}/dashboard`,
        tier: tier,
        planType: planType,
      },
    });
  },
  getActiveSubscription: (id: string) => {
    return apiClient.get(`/users/${id}/subscriptions`);
  },
};
