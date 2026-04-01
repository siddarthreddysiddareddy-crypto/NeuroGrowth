"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Get user role from localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && isAuthenticated) {
      const storedRole = localStorage.getItem("userRole");
      setUserRole(storedRole);
    }
  }, [isAuthenticated]);

  // Hide navbar on auth pages
  if (pathname.startsWith("/auth/")) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/");
    setIsProfileOpen(false);
  };

  // Get dashboard link based on user role
  const getDashboardLink = () => {
    if (userRole === "business") return "/dashboard/business";
    if (userRole === "investor") return "/dashboard/investor";
    return "/dashboard/business"; // fallback
  };

  return (
    <nav className="sticky top-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-light/20 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="font-bold text-lg text-white hidden sm:inline">
              NeuroGrowth
            </span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className={`transition-colors ${
                pathname === "/"
                  ? "text-blue-400"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Home
            </Link>

            {!isAuthenticated && (
              <Link
                href="/onboard"
                className={`transition-colors ${
                  pathname === "/onboard"
                    ? "text-blue-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Get Started
              </Link>
            )}

            {/* Dashboard Link (Role-based) */}
            {isAuthenticated && userRole && (
              <Link
                href={getDashboardLink()}
                className={`transition-colors ${
                  pathname === getDashboardLink()
                    ? "text-blue-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Dashboard
              </Link>
            )}

            {/* Profile Section or Login */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/50 transition-colors"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center border border-blue-300/50">
                    <span className="text-white font-bold text-sm">
                      {user?.name?.[0].toUpperCase() || "U"}
                    </span>
                  </div>
                  <span className="text-gray-300 hidden sm:inline text-sm font-medium">
                    {user?.name}
                  </span>
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#0B1F3A]/80 backdrop-blur-md border border-white/20 rounded-lg shadow-xl opacity-100 visible transition-all p-3 space-y-2 z-50">
                    <div className="px-4 py-3 border-b border-white/10 mb-2">
                      <p className="text-white font-semibold text-sm">
                        {user?.name}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {user?.email}
                      </p>
                      <p className="text-gray-500 text-xs mt-1 capitalize">
                        {user?.role} account
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors text-sm font-medium"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/auth/business/login"
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Login
                </Link>
                <Link
                  href="/"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
