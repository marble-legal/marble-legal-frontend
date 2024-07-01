import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "./helpers/api";
import { getUser } from "./helpers/utils";

// Create a new context
const AuthContext = createContext<any>({});

// Custom hook to access the auth context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap your app and provide auth context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const userId = getUser().id;
  const { data: userData, refetch } = useQuery(
    ["user"],
    () => api.getUser({ id: userId }),
    {
      staleTime: 15 * 60 * 1000,
      cacheTime: 15 * 60 * 1000,
    }
  );

  useEffect(() => {
    if (userData) {
      setUser(userData.data);
    }
  }, [userData]);

  // Call updateActivity once when the component mounts
  useEffect(() => {
    const updateActivity = async () => {
      try {
        await api.updateActivity(userId);
        console.log("User activity updated");
      } catch (error) {
        console.error("Failed to update user activity", error);
      }
    };

    if (userId) {
      updateActivity();
    }
  }, [userId]);

  // Value provided by the context
  const value = {
    user,
    refetch,
  };

  // Render children with auth context provider
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
