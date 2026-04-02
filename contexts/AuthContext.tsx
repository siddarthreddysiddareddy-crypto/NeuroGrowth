"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export type UserRole = "business" | "investor" | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole, additionalData?: Record<string, any>) => Promise<void>;
  logout: () => Promise<void>;
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

  // Initialize user from Supabase session on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          // Fetch user profile from database
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (profile) {
            setUser({
              id: session.user.id,
              name: profile.full_name,
              email: profile.email,
              role: profile.role,
            });
          }
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error);
      }
    };

    initAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profile) {
          setUser({
            id: session.user.id,
            name: profile.full_name,
            email: profile.email,
            role: profile.role,
          });
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

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
        if (!email || !password) {
          throw new Error("Please fill in all fields");
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          // Fetch user profile from database
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.user.id)
            .single();

          if (profileError) throw profileError;

          setUser({
            id: data.user.id,
            name: profile.full_name,
            email: profile.email,
            role: profile.role,
          });

          setShowToast("Login successful! Redirecting...", "success");
        }
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
    async (
      name: string,
      email: string,
      password: string,
      role: UserRole,
      additionalData?: Record<string, any>
    ) => {
      setIsLoading(true);
      try {
        if (!name || !email || !password) {
          throw new Error("Please fill in all fields");
        }

        if (password.length < 6) {
          throw new Error("Password must be at least 6 characters");
        }

        if (!email.includes("@")) {
          throw new Error("Please enter a valid email");
        }

        // Create auth user
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        if (!data.user) throw new Error("Failed to create user account");

        const userId = data.user.id;

        // Create profile in database
        const { error: profileError } = await supabase.from("profiles").insert({
          id: userId,
          email,
          full_name: name,
          role: role || "investor",
        });

        if (profileError) throw profileError;

        // Handle role-specific data
        if (role === "business" && additionalData) {
          const { error: msmeError } = await supabase.from("msme_profiles").insert({
            user_id: userId,
            business_name: additionalData.business_name,
            gst_number: additionalData.gst_number,
            sector: additionalData.sector,
            city: additionalData.city,
            founding_year: additionalData.founding_year,
            funding_target: additionalData.funding_target,
            equity_offered: additionalData.equity_offered,
          });

          if (msmeError) throw msmeError;
        } else if (role === "investor" && additionalData) {
          const { error: investorError } = await supabase.from("investors").insert({
            user_id: userId,
            wallet_address: additionalData.wallet_address || null,
          });

          if (investorError) throw investorError;
        }

        setUser({
          id: userId,
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

  const logout = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setShowToast("Logged out successfully", "success");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Logout failed";
      setShowToast(message, "error");
      throw error;
    }
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
