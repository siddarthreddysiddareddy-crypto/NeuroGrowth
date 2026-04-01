"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Card from "@/components/Card";
import ChatBox from "@/components/ChatBox";
import Button from "@/components/Button";

export default function BusinessDashboard() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const overviewMetrics = [
    {
      title: "Total Equity Sold",
      value: "₹25,50,000",
      change: "+12.5%",
      icon: "📊",
    },
    {
      title: "Amount Raised",
      value: "₹1,02,00,000",
      change: "+8.2%",
      icon: "💰",
    },
    {
      title: "Campaign ROI",
      value: "342%",
      change: "+24.3%",
      icon: "📈",
    },
    {
      title: "Conversions",
      value: "1,245",
      change: "+15.8%",
      icon: "✅",
    },
  ];

  const chartData = [
    { month: "Jan", value: 45000 },
    { month: "Feb", value: 52000 },
    { month: "Mar", value: 48000 },
    { month: "Apr", value: 61000 },
    { month: "May", value: 55000 },
    { month: "Jun", value: 67000 },
  ];

  const maxValue = Math.max(...chartData.map((d) => d.value));

  const recentCampaigns = [
    {
      name: "Summer Sale 2025",
      status: "Active",
      progress: 75,
      roi: "₹5,25,000",
      conversion: "12.4%",
    },
    {
      name: "Product Launch - Q2",
      status: "Active",
      progress: 58,
      roi: "₹3,10,000",
      conversion: "8.7%",
    },
    {
      name: "Email Marketing Campaign",
      status: "Completed",
      progress: 100,
      roi: "₹2,48,000",
      conversion: "6.2%",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] via-[#0E2650] to-[#0B1F3A]">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Business Dashboard
              </h1>
              <p className="text-gray-300">
                Welcome back, {user?.name}! Here&apos;s your growth metrics overview.
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" size="md">
                📊 Download Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {overviewMetrics.map((metric, idx) => (
            <Card key={idx} className="bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-300 text-sm font-medium">
                    {metric.title}
                  </p>
                  <h3 className="text-2xl font-bold text-white mt-2">
                    {metric.value}
                  </h3>
                </div>
                <span className="text-2xl">{metric.icon}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400 font-semibold text-sm">
                  {metric.change}
                </span>
                <span className="text-gray-400 text-sm">this month</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Chart */}
          <div className="lg:col-span-2">
            <Card className="h-full bg-white/10 backdrop-blur-lg border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6">
                Revenue Trend (Last 6 Months)
              </h3>
              <div className="h-64 flex items-flex-end justify-around gap-4">
                {chartData.map((data, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center gap-2 flex-1"
                  >
                    <div className="w-full bg-blue-500/20 rounded-t-lg relative group">
                      <div
                        className="bg-gradient-to-t from-blue-500 to-blue-300 w-full rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-400 cursor-pointer"
                        style={{
                          height: `${(data.value / maxValue) * 200}px`,
                        }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#0B1F3A] text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                          ₹{(data.value / 100000).toFixed(1)}L
                        </div>
                      </div>
                    </div>
                    <span className="text-gray-300 text-xs font-medium">
                      {data.month}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Quick Stats */}
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6">
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-400/30">
                <p className="text-sm text-gray-300 mb-1">Avg. Daily Revenue</p>
                <p className="text-2xl font-bold text-blue-300">₹3,40,000</p>
              </div>
              <div className="p-4 bg-green-500/20 rounded-lg border border-green-400/30">
                <p className="text-sm text-gray-300 mb-1">
                  Conversion Rate
                </p>
                <p className="text-2xl font-bold text-green-300">12.8%</p>
              </div>
              <div className="p-4 bg-purple-500/20 rounded-lg border border-purple-400/30">
                <p className="text-sm text-gray-300 mb-1">Active Customers</p>
                <p className="text-2xl font-bold text-purple-300">3,420</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Campaigns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6">
                Recent Campaigns
              </h3>
              <div className="space-y-4">
                {recentCampaigns.map((campaign, idx) => (
                  <div
                    key={idx}
                    className="p-4 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">
                          {campaign.name}
                        </h4>
                        <p className="text-sm text-gray-300">
                          Status:{" "}
                          <span
                            className={`font-medium ${
                              campaign.status === "Active"
                                ? "text-green-400"
                                : "text-gray-400"
                            }`}
                          >
                            {campaign.status}
                          </span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white">
                          {campaign.roi}
                        </p>
                        <p className="text-sm text-green-400">
                          {campaign.conversion} conversion
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-300 h-2 rounded-full"
                        style={{ width: `${campaign.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      {campaign.progress}% complete
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Actions */}
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button variant="primary" size="md" className="w-full">
                💎 Sell Tokens
              </Button>
              <Button variant="primary" size="md" className="w-full">
                📢 Create Campaign
              </Button>
              <Button variant="secondary" size="md" className="w-full">
                📊 View Analytics
              </Button>
              <Button variant="outline" size="md" className="w-full">
                ⚙️ Settings
              </Button>
            </div>
          </Card>
        </div>

        {/* AI Chat */}
        <div className="max-w-2xl">
          <ChatBox title="Business Growth Assistant" placeholder="Ask me about your growth strategy..." />
        </div>
      </div>
    </div>
  );
}
