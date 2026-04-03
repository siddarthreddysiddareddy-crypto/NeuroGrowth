"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNeuroGrowth } from "../hooks/useNeuroGrowth";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { walletAddress, userBalance, connectWallet } = useNeuroGrowth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && isAuthenticated) {
      const storedRole = localStorage.getItem("userRole");
      setUserRole(storedRole);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Hide navbar on auth pages
  if (pathname.startsWith("/auth/")) return null;

  const handleLogout = () => {
    logout();
    router.push("/");
    setIsProfileOpen(false);
  };

  const navBg = scrolled
    ? "bg-[#080f1e]/90 border-white/[0.08] shadow-[0_1px_0_rgba(255,255,255,0.05)]"
    : "bg-[#080f1e]/70 border-white/[0.06]";

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200"
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                boxShadow: "0 4px 16px rgba(59,130,246,0.35)",
              }}
            >
              <span className="text-white font-black text-sm tracking-tight">N</span>
            </div>
            <span className="font-bold text-lg text-white hidden sm:inline tracking-tight">
              Neuro<span className="text-blue-400">Growth</span>
            </span>
          </Link>

          {/* ── Right section ── */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Home link */}
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === "/"
                  ? "text-blue-400 bg-blue-500/10"
                  : "text-white/50 hover:text-white/80 hover:bg-white/[0.05]"
              }`}
            >
              Home
            </Link>

            {/* Dashboard Link (Role-based) */}
            {isAuthenticated && userRole && (
              <Link
                href={userRole === "business" ? "/dashboard/business" : "/dashboard/investor"}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname.startsWith("/dashboard")
                    ? "text-blue-400 bg-blue-500/10"
                    : "text-white/50 hover:text-white/80 hover:bg-white/[0.05]"
                }`}
              >
                Dashboard
              </Link>
            )}

            {/* Auth / Profile */}
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl hover:bg-white/[0.06] transition-all duration-200 group"
                  aria-label="Profile menu"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ring-2 ring-blue-500/30 group-hover:ring-blue-500/60 transition-all"
                    style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}
                  >
                    {user?.name?.[0].toUpperCase() || "U"}
                  </div>
                  <span className="text-white/70 hidden sm:inline text-sm font-medium group-hover:text-white/90 transition-colors">
                    {user?.name}
                  </span>
                  <svg className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                {isProfileOpen && (
                  <div
                    className="absolute right-0 mt-2 w-60 rounded-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{
                      background: "rgba(10,18,35,0.95)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      backdropFilter: "blur(24px)",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                    }}
                  >
                    <div className="px-4 py-4 border-b border-white/[0.07]">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
                          style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}
                        >
                          {user?.name?.[0].toUpperCase() || "U"}
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{user?.name}</p>
                          <p className="text-white/40 text-xs">{user?.email}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize"
                            style={{
                              background: userRole === "investor" ? "rgba(16,185,129,0.12)" : "rgba(59,130,246,0.12)",
                              color: userRole === "investor" ? "#34d399" : "#60a5fa",
                              border: userRole === "investor" ? "1px solid rgba(16,185,129,0.25)" : "1px solid rgba(59,130,246,0.25)",
                            }}
                          >
                            {user?.role}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="w-full px-3 py-2.5 text-left text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all text-sm font-medium flex items-center gap-2"
                      >
                        <span>🚪</span> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/business/login"
                  className="px-3 py-1.5 text-white/55 hover:text-white/85 transition-colors text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/onboard"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                    boxShadow: "0 4px 16px rgba(59,130,246,0.35)",
                  }}
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Wallet */}
            {walletAddress ? (
              <div
                className="hidden sm:flex items-center rounded-xl overflow-hidden text-sm"
                style={{
                  background: "rgba(16,185,129,0.08)",
                  border: "1px solid rgba(16,185,129,0.20)",
                }}
              >
                <div className="px-3 py-2 text-white/80 font-medium border-r border-emerald-500/[0.15]">
                  {userBalance ? parseFloat(userBalance).toLocaleString(undefined, { maximumFractionDigits: 2 }) : "0"}{" "}
                  <span className="text-emerald-400 text-xs">NGT</span>
                </div>
                <div className="px-3 py-2 text-emerald-300/70 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                  {`${walletAddress.slice(0, 6)}…${walletAddress.slice(-4)}`}
                </div>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-[0_4px_16px_rgba(59,130,246,0.4)]"
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                  boxShadow: "0 2px 12px rgba(59,130,246,0.30)",
                }}
              >
                🔗 Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
