import React, { createContext, useState, useEffect } from "react";
import axios from "../api/axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load token + user from localStorage on refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("movie_user");

    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // LOGIN USER
  const login = async (email, password) => {
    try {
      const res = await axios.post("/auth/login", { email, password });

      const { token, user } = res.data;

      // Save in state
      setToken(token);
      setUser(user);

      // Save to storage
      localStorage.setItem("token", token);
      localStorage.setItem("movie_user", JSON.stringify(user));

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  // LOGOUT USER
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("movie_user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
