"use client";

import Card from "@/components/Card";
import ChatBox from "@/components/ChatBox";

const aiInsights = [
  { title: "Content Optimization", description: "AI-powered tips to boost your content engagement", icon: "✨" },
  { title: "Audience Analysis", description: "Deep insights into your audience behavior", icon: "📊" },
  { title: "Performance Prediction", description: "Predict campaign performance before launch", icon: "🔮" },
  { title: "Trend Detection", description: "Spot emerging trends in your market", icon: "🚀" },
  { title: "Competitor Analysis", description: "Stay ahead of your competition", icon: "🎯" },
  { title: "Growth Recommendations", description: "Get personalized growth strategies", icon: "📈" },
];

const suggestedPrompts = [
  "How can I improve my campaign engagement?",
  "What's the best time to post content?",
  "Analyze my competitor's strategy",
  "Generate content ideas for next month",
  "What metrics should I focus on?",
  "Help me optimize my ad spend",
];

export default function AIToolsPage() {
  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">AI Tools</h1>
        <p className="text-gray-300 text-lg">
          Leverage AI-powered insights and automation for your campaigns
        </p>
      </div>

      {/* Main Chat */}
      <div className="mb-8">
        <div className="h-[500px]">
          <ChatBox
            title="🤖 Business AI Advisor"
            placeholder="Ask me anything about your campaigns, analytics, or growth strategy..."
            type="business"
          />
        </div>
      </div>

      {/* Suggested Prompts */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Suggested Prompts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestedPrompts.map((prompt, i) => (
            <button
              key={i}
              className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 hover:border-blue-500/50 rounded-lg text-left transition-all hover:bg-blue-500/20 group"
            >
              <p className="text-sm text-blue-300 group-hover:text-blue-200 transition-colors">
                {prompt}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* AI Features Grid */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">AI Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiInsights.map((insight, i) => (
            <Card
              key={i}
              className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20 hover:border-purple-500/50 transition-colors cursor-pointer group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{insight.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{insight.title}</h3>
              <p className="text-sm text-gray-300">{insight.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Insights */}
      <Card title="📋 Recent AI Insights">
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-green-500/10 to-green-400/10 border border-green-500/30 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <p className="font-semibold text-green-300">✨ Content Quality Score</p>
              <span className="text-lg font-bold text-green-400">9.2/10</span>
            </div>
            <p className="text-sm text-gray-300">
              Your latest content is performing exceptionally well. Continue focusing on video content to maintain momentum.
            </p>
          </div>
          <div className="p-4 bg-gradient-to-r from-blue-500/10 to-blue-400/10 border border-blue-500/30 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <p className="font-semibold text-blue-300">🎯 Audience Engagement Peak</p>
              <span className="text-lg font-bold text-blue-400">8:45 PM</span>
            </div>
            <p className="text-sm text-gray-300">
              Your audience is most active between 8 PM - 10 PM. Schedule important posts during this window for maximum reach.
            </p>
          </div>
          <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-yellow-400/10 border border-yellow-500/30 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <p className="font-semibold text-yellow-300">📈 Growth Recommendation</p>
              <span className="text-lg font-bold text-yellow-400">+24%</span>
            </div>
            <p className="text-sm text-gray-300">
              Implementing our suggested A/B testing strategy could increase conversions by up to 24% in the next quarter.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
