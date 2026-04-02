"use client";

import Card from "@/components/Card";

const connections = [
  {
    name: "Sarah Chen",
    title: "Venture Capitalist",
    bio: "Founder of Green Valley VC, investing in climate tech",
    commonInterests: ["Climate Tech", "Sustainability", "Series A"],
    avatar: "👩‍💼",
  },
  {
    name: "Rajesh Kumar",
    title: "Serial Entrepreneur",
    bio: "Built 3 successful startups, now advising early-stage founders",
    commonInterests: ["SaaS", "B2B", "Growth Stage"],
    avatar: "👨‍💼",
  },
  {
    name: "Emma Roberts",
    title: "Angel Investor & Mentor",
    bio: "Focused on women-led startups in tech and healthcare",
    commonInterests: ["Healthcare", "EdTech", "Seed Stage"],
    avatar: "👩",
  },
  {
    name: "Vikram Patel",
    title: "Investment Banker",
    bio: "Specialist in M&A and exit strategies for tech companies",
    commonInterests: ["Exit Strategies", "Series B+", "Finance"],
    avatar: "👨",
  },
  {
    name: "Lisa Wang",
    title: "Product Manager & Advisor",
    bio: "Experienced scaling SaaS products internationally",
    commonInterests: ["SaaS", "Product", "Scaling"],
    avatar: "👩‍💻",
  },
  {
    name: "Amit Desai",
    title: "Industry Expert",
    bio: "15+ years in fintech and payment solutions",
    commonInterests: ["Fintech", "Payments", "India Market"],
    avatar: "👨‍💻",
  },
];

const suggestedPartners = [
  {
    name: "TechConnect Network",
    description: "Community of 5000+ tech investors and founders",
    members: "5K+",
    focus: "Technology",
  },
  {
    name: "Green Investment Alliance",
    description: "Investors focused on sustainable and climate tech",
    members: "2.3K",
    focus: "Sustainability",
  },
  {
    name: "Healthcare Investors Club",
    description: "Specialized group for healthcare and biotech investments",
    members: "1.8K",
    focus: "Healthcare",
  },
];

export default function NetworkPage() {
  return (
    <div className="p-8 pt-20">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Investment Network</h1>
        <p className="text-gray-300 text-lg">
          Connect with investors, founders, and industry experts
        </p>
      </div>

      {/* Connections Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Your Network</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((connection, i) => (
            <Card
              key={i}
              className="group hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{connection.avatar}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">
                    {connection.name}
                  </h3>
                  <p className="text-green-400 text-sm font-medium">
                    {connection.title}
                  </p>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {connection.bio}
              </p>

              <div className="mb-4 pt-4 border-t border-white/10">
                <p className="text-xs text-gray-400 mb-2 font-semibold">Common Interests:</p>
                <div className="flex flex-wrap gap-2">
                  {connection.commonInterests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-300 rounded-lg transition-colors text-sm font-medium">
                Message
              </button>
            </Card>
          ))}
        </div>
      </div>

      {/* Suggested Networks Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Suggested Networks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {suggestedPartners.map((partner, i) => (
            <Card
              key={i}
              className="group hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300"
            >
              <div className="mb-4">
                <h3 className="text-lg font-bold text-white mb-2">
                  {partner.name}
                </h3>
                <span className="text-xs px-3 py-1 bg-green-500/20 text-green-300 rounded-full font-medium">
                  {partner.focus}
                </span>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {partner.description}
              </p>

              <div className="mb-4 pt-4 border-t border-white/10">
                <p className="text-sm text-gray-300">
                  <span className="font-bold text-green-400">{partner.members}</span>{" "}
                  <span className="text-gray-400">members</span>
                </p>
              </div>

              <button className="w-full px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-300 rounded-lg transition-colors text-sm font-medium">
                Join Network
              </button>
            </Card>
          ))}
        </div>
      </div>

      {/* Network Stats */}
      <Card title="📊 Network Statistics">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-4xl font-bold text-green-400 mb-2">342</p>
            <p className="text-gray-400 text-sm">Active Connections</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-green-400 mb-2">28</p>
            <p className="text-gray-400 text-sm">Co-Investment Opportunities</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-green-400 mb-2">1.2K</p>
            <p className="text-gray-400 text-sm">Active Deals in Network</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
