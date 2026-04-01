"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

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

            {/* Dashboards Dropdown */}
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

            <button className="btn-primary text-sm">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
