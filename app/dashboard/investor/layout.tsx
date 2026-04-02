"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function InvestorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const investorNavigation = [
    { name: "Dashboard", href: "/dashboard/investor", icon: "📊" },
    { name: "Opportunities", href: "/dashboard/investor/opportunities", icon: "✨" },
    { name: "Portfolio", href: "/dashboard/investor/portfolio", icon: "💼" },
    { name: "Network", href: "/dashboard/investor/network", icon: "🤝" },
    { name: "Settings", href: "/dashboard/investor/settings", icon: "⚙️" },
  ];

  return (
    <div className="flex">
      {/* Investor Sidebar */}
      <div className="w-64 fixed h-screen bg-[#08172E] border-r border-white/10 p-6 overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-white font-bold text-lg">Investor Tools</h2>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2">
          {investorNavigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? "bg-green-500/20 text-green-400 border border-green-500/50"
                    : "text-gray-300 hover:bg-white/10"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Profile Section */}
        <div className="mt-12 pt-6 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">IN</span>
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Investor</p>
              <p className="text-gray-400 text-xs">Active Account</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 w-full min-h-screen bg-gradient-to-br from-[#0B1E3A] via-[#0E2650] to-[#0B1E3A]">
        {children}
      </div>
    </div>
  );
}
