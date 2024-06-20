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
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    }
  );

  useEffect(() => {
    if (userData) {
      setUser(userData.data);
    }
  }, [userData]);

  // Value provided by the context
  const value = {
    user,
    refetch,
  };

  // Render children with auth context provider
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
