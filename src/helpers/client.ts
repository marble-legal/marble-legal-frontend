import axios from "axios";
import toast from "react-hot-toast";
import { clearTokenAndUser } from "./utils";
// import { getToken } from "helpers/utils/auth-provider";

const apiURLEndpoint = process.env.REACT_APP_API_URL;

const onResponse = (response: any) => response;
const onResponseError = (error: any) => {
  if (error.response?.status === 401 && !error.config.url.includes("login")) {
    // handle unauthorized
    toast.error("Session expired. Please login again.");
    clearTokenAndUser();
    setTimeout(() => {
      window.location.replace("/");
    }, 1000);
  }
  return Promise.reject(error);
};

function onRequest(config: any) {
  //   const token = getToken();
  // eslint-disable-next-line no-param-reassign
  config.headers["Authorization"] =
    "Bearer " + localStorage.getItem("token") || "";
  return config;
}

// create client instance
const client = axios.create({
  baseURL: apiURLEndpoint,
});
client.interceptors.request.use(onRequest);
client.interceptors.response.use(onResponse, onResponseError);

// const AUTH_TOKEN = getToken();
// client.defaults.headers.common.Authorization = AUTH_TOKEN;

export default client;
