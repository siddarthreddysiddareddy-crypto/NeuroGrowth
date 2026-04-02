"use client";

import Card from "@/components/Card";

const portfolio = [
  {
    name: "DataViz Systems",
    investedNum: 3000000,
    investedDisplay: "₹30,00,000",
    currentNum: 4500000,
    currentDisplay: "₹45,00,000",
    return: "+150%",
    stage: "Growth",
    description: "Data visualization platform for enterprises",
  },
  {
    name: "HealthTech Labs",
    investedNum: 2000000,
    investedDisplay: "₹20,00,000",
    currentNum: 5200000,
    currentDisplay: "₹52,00,000",
    return: "+260%",
    stage: "On Track",
    description: "Healthcare solutions using AI and IoT",
  },
  {
    name: "CloudNine Storage",
    investedNum: 2500000,
    investedDisplay: "₹25,00,000",
    currentNum: 6800000,
    currentDisplay: "₹68,00,000",
    return: "+172%",
    stage: "Exit Prep",
    description: "Cloud storage and backup solutions",
  },
  {
    name: "FinTech Innovations",
    investedNum: 1800000,
    investedDisplay: "₹18,00,000",
    currentNum: 4200000,
    currentDisplay: "₹42,00,000",
    return: "+233%",
    stage: "Growth",
    description: "Digital payment and lending platform",
  },
  {
    name: "GreenEnergy Co",
    investedNum: 4000000,
    investedDisplay: "₹40,00,000",
    currentNum: 7200000,
    currentDisplay: "₹72,00,000",
    return: "+80%",
    stage: "On Track",
    description: "Renewable energy solutions for businesses",
  },
  {
    name: "AI Analytics Pro",
    investedNum: 2200000,
    investedDisplay: "₹22,00,000",
    currentNum: 3600000,
    currentDisplay: "₹36,00,000",
    return: "+64%",
    stage: "Growth",
    description: "Advanced analytics platform using machine learning",
  },
];

const portfolioStats = [
  { label: "Total Invested", value: "₹14,50,00,000", icon: "💰" },
  { label: "Current Value", value: "₹31,80,00,000", icon: "📈" },
  { label: "Total Return", value: "+119%", icon: "✨" },
  { label: "Average ROI", value: "28.4%", icon: "🎯" },
];

export default function PortfolioPage() {
  return (
    <div className="p-8 pt-20">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Full Portfolio</h1>
        <p className="text-gray-300 text-lg">
          Complete view of your investments and returns
        </p>
      </div>

      {/* Portfolio Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {portfolioStats.map((stat, i) => (
          <Card key={i} className="text-center">
            <div className="text-4xl mb-3">{stat.icon}</div>
            <h3 className="text-gray-400 text-sm mb-2">{stat.label}</h3>
            <div className="flex items-baseline justify-center gap-2">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Portfolio Holdings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {portfolio.map((investment, i) => (
          <Card
            key={i}
            className="group hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">
                  {investment.name}
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  {investment.description}
                </p>
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full font-medium">
                  {investment.stage}
                </span>
              </div>
              <div className="text-right ml-4">
                <p className="text-3xl font-bold text-green-400 mb-1">
                  {investment.return}
                </p>
                <p className="text-xs text-gray-400">Return</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-white/10">
              <div>
                <p className="text-xs text-gray-400 mb-1">Amount Invested</p>
                <p className="text-lg font-bold text-white">
                  {investment.investedDisplay}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Current Value</p>
                <p className="text-lg font-bold text-green-400">
                  {investment.currentDisplay}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all"
                style={{
                  width: `${Math.min(100, (investment.currentNum / investment.investedNum) * 50)}%`,
                }}
              ></div>
            </div>

            <button className="w-full mt-4 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-300 rounded-lg transition-colors text-sm font-medium">
              View Details
            </button>
          </Card>
        ))}
      </div>

      {/* Diversification Card */}
      <Card title="📊 Portfolio Diversification">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-gray-300">Technology</span>
              <span className="text-green-400 font-semibold">45%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: "45%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-gray-300">Healthcare</span>
              <span className="text-green-400 font-semibold">25%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: "25%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-gray-300">Energy & Environmental</span>
              <span className="text-green-400 font-semibold">20%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: "20%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-gray-300">Finance</span>
              <span className="text-green-400 font-semibold">10%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "10%" }}></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
