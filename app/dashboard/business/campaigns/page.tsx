"use client";

import Card from "@/components/Card";
import { useState } from "react";

const campaigns = [
  { id: 1, name: "Spring Sale 2024", status: "Active", progress: 75, budget: 50000, spent: 37500, roi: "₹15,42,000", startDate: "Jan 15, 2024", endDate: "Mar 31, 2024" },
  { id: 2, name: "Q2 Product Launch", status: "Planning", progress: 40, budget: 75000, spent: 30000, roi: "TBD", startDate: "Apr 1, 2024", endDate: "Jun 30, 2024" },
  { id: 3, name: "Email Nurture Sequence", status: "Active", progress: 60, budget: 25000, spent: 15000, roi: "₹8,95,000", startDate: "Feb 1, 2024", endDate: "May 31, 2024" },
  { id: 4, name: "Referral Program Launch", status: "Planning", progress: 15, budget: 40000, spent: 6000, roi: "TBD", startDate: "May 2024", endDate: "Aug 2024" },
];

export default function CampaignsPage() {
  const [selectedFilter, setSelectedFilter] = useState<"All" | "Active" | "Planning">("All");

  const filteredCampaigns = campaigns.filter(
    (c) => selectedFilter === "All" || c.status === selectedFilter
  );

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-12 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Campaigns</h1>
          <p className="text-gray-300 text-lg">Manage and track all marketing campaigns</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-blue-500/20">
          + New Campaign
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-8">
        {["All", "Active", "Planning"].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter as "All" | "Active" | "Planning")}
            className={`px-4 py-2 rounded-lg transition-colors font-medium ${
              selectedFilter === filter
                ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                : "bg-white/5 text-gray-300 hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Campaigns List */}
      <div className="space-y-6">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="overflow-hidden">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white">{campaign.name}</h3>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      campaign.status === "Active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {campaign.status}
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  {campaign.startDate} - {campaign.endDate}
                </p>
              </div>
              <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-lg transition-colors text-sm">
                View Details
              </button>
            </div>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300">Progress</span>
                <span className="text-sm font-semibold text-blue-300">{campaign.progress}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all"
                  style={{ width: `${campaign.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">Budget</p>
                <p className="text-lg font-bold text-white">₹{campaign.budget.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">Spent</p>
                <p className="text-lg font-bold text-white">₹{campaign.spent.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">Remaining</p>
                <p className="text-lg font-bold text-green-400">
                  ₹{(campaign.budget - campaign.spent).toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">ROI</p>
                <p className="text-lg font-bold text-green-400">{campaign.roi}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
