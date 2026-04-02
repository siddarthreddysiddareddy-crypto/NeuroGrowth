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
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          // Only set user if profile exists — avoids redirect loops when
          // a session exists but email hasn't been confirmed yet.
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

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") {
        setUser(null);
        return;
      }

      if (session?.user) {
        try {
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
          // If profile is null (e.g. email not confirmed), don't touch user state
        } catch (err) {
          console.error("onAuthStateChange profile fetch failed:", err);
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

        // Guard: if email confirmation is required (identities array is empty
        // or session is null), inform the user to verify their email instead
        // of attempting profile inserts that will fail due to RLS.
        if (data.session === null && !data.user.email_confirmed_at) {
          setShowToast(
            "Account created! Please check your email to confirm your account before logging in.",
            "success"
          );
          return;
        }

        const userId = data.user.id;
        const resolvedRole = role || "investor";

        // Create base profile — this must succeed before role-specific inserts
        const { error: profileError } = await supabase.from("profiles").insert({
          id: userId,
          email,
          full_name: name,
          role: resolvedRole,
        });

        if (profileError) {
          console.error("Profile insert error:", profileError);
          throw new Error(`Failed to create profile: ${profileError.message}`);
        }

        // Role-specific table inserts
        if (resolvedRole === "business") {
          const msmePayload = {
            user_id: userId,
            business_name: additionalData?.business_name ?? "",
            gst_number: additionalData?.gst_number ?? "",
            sector: additionalData?.sector ?? "",
            city: additionalData?.city ?? "",
            founding_year: additionalData?.founding_year ?? new Date().getFullYear(),
            funding_target: additionalData?.funding_target ?? 0,
            equity_offered: additionalData?.equity_offered ?? 0,
          };
          const { error: msmeError } = await supabase.from("msme_profiles").insert(msmePayload);
          if (msmeError) {
            console.error("MSME profile insert error:", msmeError);
            throw new Error(`Failed to create business profile: ${msmeError.message}`);
          }
        } else if (resolvedRole === "investor") {
          // Always create investor row — wallet_address is optional
          const { error: investorError } = await supabase.from("investors").insert({
            user_id: userId,
            wallet_address: additionalData?.wallet_address || null,
          });
          if (investorError) {
            console.error("Investor insert error:", investorError);
            throw new Error(`Failed to create investor profile: ${investorError.message}`);
          }
        }

        setUser({
          id: userId,
          name,
          email,
          role: resolvedRole,
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
