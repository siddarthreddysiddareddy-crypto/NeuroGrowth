"use client";

import Card from "@/components/Card";
import Link from "next/link";

const opportunities = [
  {
    title: "AI-Powered Healthcare",
    description: "Telemedicine platform with AI diagnostics",
    stage: "Seed",
    amountRange: "₹30,00,000 - ₹50,00,000",
    match: "94%",
    details: "Building the next generation of healthcare with AI-powered diagnostics for remote areas",
  },
  {
    title: "Sustainable Fashion Tech",
    description: "Blockchain supply chain for ethical fashion",
    stage: "Series A",
    amountRange: "₹75,00,000 - ₹1,20,00,000",
    match: "88%",
    details: "Transparent supply chain using blockchain to track ethical fashion sourcing",
  },
  {
    title: "Fintech for Emerging Markets",
    description: "Payment solutions for underbanked populations",
    stage: "Series B",
    amountRange: "₹1,50,00,000 - ₹2,50,00,000",
    match: "91%",
    details: "Enabling financial inclusion with innovative payment solutions",
  },
  {
    title: "EdTech Platform",
    description: "AI-powered personalized learning experience",
    stage: "Seed",
    amountRange: "₹25,00,000 - ₹40,00,000",
    match: "86%",
    details: "Adaptive learning platform that personalizes education for each student",
  },
  {
    title: "Climate Tech Solutions",
    description: "Carbon tracking and reduction platform",
    stage: "Series A",
    amountRange: "₹50,00,000 - ₹85,00,000",
    match: "89%",
    details: "Enterprise platform for tracking and reducing carbon emissions",
  },
  {
    title: "Logistics Automation",
    description: "AI-powered supply chain optimization",
    stage: "Series B",
    amountRange: "₹1,00,00,000 - ₹1,75,00,000",
    match: "92%",
    details: "Optimizing supply chains with AI and automation for logistics companies",
  },
];

export default function OpportunitiesPage() {
  return (
    <div className="p-8 pt-20">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Investment Opportunities</h1>
        <p className="text-gray-300 text-lg">
          AI-recommended deals matched to your investment profile
        </p>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {opportunities.map((opp, i) => (
          <Card
            key={i}
            className="group hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <p className="font-semibold text-green-400 mb-1 text-lg">
                  {opp.title}
                </p>
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full font-medium">
                  {opp.stage}
                </span>
              </div>
              <div className="text-right ml-4">
                <p className="text-sm text-gray-400">Match</p>
                <p className="text-2xl font-bold text-green-400">
                  {opp.match}
                </p>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {opp.description}
            </p>

            <p className="text-gray-400 text-xs mb-4 line-clamp-2">
              {opp.details}
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-xs text-gray-300">
                <span className="font-medium">Investment Range:</span>
                <span className="text-green-400 font-semibold">{opp.amountRange}</span>
              </div>
            </div>

            <button className="w-full px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-300 rounded-lg transition-colors text-sm font-medium">
              View Full Details
            </button>
          </Card>
        ))}
      </div>

      {/* Browse All CTA */}
      <Card className="text-center bg-gradient-to-r from-green-600/20 to-green-500/20">
        <h2 className="text-2xl font-bold text-white mb-3">
          More Opportunities Coming
        </h2>
        <p className="text-gray-300 mb-6">
          New deals are added weekly based on your investment criteria
        </p>
        <button className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold rounded-lg transition-all">
          Subscribe to New Deals
        </button>
      </Card>
    </div>
  );
}
