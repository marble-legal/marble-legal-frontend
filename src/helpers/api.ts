import apiClient from "./client";

export const api = {
  login: (data: any) => {
    return apiClient.post("/auth/login", data);
  },
};
