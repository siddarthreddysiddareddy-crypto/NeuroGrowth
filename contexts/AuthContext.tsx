"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "business" | "investor" | null;

export interface User {
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  setShowToast: (message: string, type: "success" | "error") => void;
  toast: { message: string; type: "success" | "error"; show: boolean } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToastState] = useState<{
    message: string;
    type: "success" | "error";
    show: boolean;
  } | null>(null);

  const setShowToast = useCallback(
    (message: string, type: "success" | "error") => {
      setToastState({ message, type, show: true });
      setTimeout(() => {
        setToastState(null);
      }, 3000);
    },
    []
  );

  const login = useCallback(
    async (email: string, password: string, role: UserRole) => {
      setIsLoading(true);
      try {
        // Simulate login delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Simulate validation
        if (!email || !password) {
          throw new Error("Please fill in all fields");
        }

        if (password.length < 6) {
          throw new Error("Password must be at least 6 characters");
        }

        // Mock user data
        const mockName = email.split("@")[0];
        setUser({
          name: mockName,
          email,
          role,
        });

        setShowToast("Login successful! Redirecting...", "success");
      } catch (error) {
        const message = error instanceof Error ? error.message : "Login failed";
        setShowToast(message, "error");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setShowToast]
  );

  const register = useCallback(
    async (name: string, email: string, password: string, role: UserRole) => {
      setIsLoading(true);
      try {
        // Simulate registration delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Simulate validation
        if (!name || !email || !password) {
          throw new Error("Please fill in all fields");
        }

        if (password.length < 6) {
          throw new Error("Password must be at least 6 characters");
        }

        if (!email.includes("@")) {
          throw new Error("Please enter a valid email");
        }

        // Set user after successful registration
        setUser({
          name,
          email,
          role,
        });

        setShowToast("Registration successful! Welcome to NeuroGrowth!", "success");
      } catch (error) {
        const message = error instanceof Error ? error.message : "Registration failed";
        setShowToast(message, "error");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setShowToast]
  );

  const logout = useCallback(() => {
    setUser(null);
    setShowToast("Logged out successfully", "success");
  }, [setShowToast]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: user !== null,
    login,
    register,
    logout,
    setShowToast,
    toast,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
