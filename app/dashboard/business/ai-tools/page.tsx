"use client";

import Card from "@/components/Card";
import ChatBox from "@/components/ChatBox";

const aiInsights = [
  { title: "Content Optimization", description: "AI-powered tips to boost your content engagement", icon: "✨", accent: "#60a5fa" },
  { title: "Audience Analysis", description: "Deep insights into your audience behaviour", icon: "📊", accent: "#a78bfa" },
  { title: "Performance Prediction", description: "Predict campaign performance before launch", icon: "🔮", accent: "#f472b6" },
  { title: "Trend Detection", description: "Spot emerging trends in your market", icon: "🚀", accent: "#34d399" },
  { title: "Competitor Analysis", description: "Stay ahead of your competition", icon: "🎯", accent: "#fbbf24" },
  { title: "Growth Recommendations", description: "Get personalised growth strategies", icon: "📈", accent: "#60a5fa" },
];

const suggestedPrompts = [
  "How can I improve my campaign engagement?",
  "What's the best time to post content?",
  "Analyse my competitor's strategy",
  "Generate content ideas for next month",
  "What metrics should I focus on?",
  "Help me optimise my ad spend",
];

const recentInsights = [
  {
    title: "✨ Content Quality Score",
    value: "9.2/10",
    body: "Your latest content is performing exceptionally well. Continue focusing on video content to maintain momentum.",
    accent: "#34d399",
  },
  {
    title: "🎯 Audience Engagement Peak",
    value: "8:45 PM",
    body: "Your audience is most active between 8 PM – 10 PM. Schedule important posts during this window for maximum reach.",
    accent: "#60a5fa",
  },
  {
    title: "📈 Growth Recommendation",
    value: "+24%",
    body: "Implementing our suggested A/B testing strategy could increase conversions by up to 24% in the next quarter.",
    accent: "#fbbf24",
  },
];

export default function AIToolsPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white mb-1 tracking-tight">AI Tools</h1>
        <p className="text-white/40 text-sm">
          Leverage AI-powered insights and automation for your campaigns
        </p>
      </div>

      {/* Main Chat */}
      <div className="mb-8">
        <div className="h-[480px]">
          <ChatBox
            title="🤖 Business AI Advisor"
            placeholder="Ask me anything about your campaigns, analytics, or growth strategy..."
            type="business"
          />
        </div>
      </div>

      {/* Suggested Prompts */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-white/80 mb-4">Suggested Prompts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {suggestedPrompts.map((prompt, i) => (
            <button
              key={i}
              className="p-4 rounded-xl text-left transition-all duration-200 hover:scale-[1.02] group"
              style={{
                background: "rgba(59,130,246,0.06)",
                border: "1px solid rgba(59,130,246,0.14)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.12)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.28)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.06)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.14)";
              }}
            >
              <p className="text-sm text-blue-300/80 group-hover:text-blue-200 transition-colors leading-relaxed">
                {prompt}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* AI Capabilities Grid */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-white/80 mb-4">AI Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiInsights.map((insight, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl p-5 group cursor-pointer transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(20px)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = `${insight.accent}08`;
                (e.currentTarget as HTMLElement).style.borderColor = `${insight.accent}25`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
              }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                {insight.icon}
              </div>
              <h3 className="text-sm font-bold text-white/90 mb-1.5">{insight.title}</h3>
              <p className="text-xs text-white/35 leading-relaxed">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Insights */}
      <Card title="📋 Recent AI Insights">
        <div className="space-y-3">
          {recentInsights.map((insight, i) => (
            <div
              key={i}
              className="flex items-start justify-between p-4 rounded-xl"
              style={{
                background: `${insight.accent}0A`,
                border: `1px solid ${insight.accent}22`,
              }}
            >
              <div className="flex-1">
                <p className="text-sm font-semibold mb-1.5" style={{ color: insight.accent }}>
                  {insight.title}
                </p>
                <p className="text-xs text-white/40 leading-relaxed">{insight.body}</p>
              </div>
              <span className="ml-4 text-lg font-extrabold tabular-nums" style={{ color: insight.accent }}>
                {insight.value}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
