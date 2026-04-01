"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Hide navbar on auth pages
  if (pathname.startsWith("/auth/")) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/");
    setIsProfileOpen(false);
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

            {/* Dashboards Dropdown */}
            {isAuthenticated && (
              <div className="relative group">
                <button className="px-3 py-2 text-gray-300 hover:text-white transition-colors">
                  Dashboards ▼
                </button>
                <div className="absolute left-0 mt-0 w-48 bg-primary-light border border-primary-light/50 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 space-y-1 z-50">
                  <Link
                    href="/dashboard/business"
                    className="block px-4 py-2 text-gray-300 hover:text-blue-400 hover:bg-primary/50 rounded transition-colors"
                  >
                    Business Dashboard
                  </Link>
                  <Link
                    href="/dashboard/investor"
                    className="block px-4 py-2 text-gray-300 hover:text-green-400 hover:bg-primary/50 rounded transition-colors"
                  >
                    Investor Dashboard
                  </Link>
                </div>
              </div>
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
                  <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700/50 rounded-lg shadow-xl opacity-100 visible transition-all p-3 space-y-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-700/50 mb-2">
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
