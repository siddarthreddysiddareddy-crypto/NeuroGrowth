"use client";

import React, { useState } from "react";
import Button from "./Button";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatBoxProps {
  title?: string;
  placeholder?: string;
  type?: "business" | "investor";
}

const mockAIResponsesBusiness = [
  "That's a great question! Here's what I recommend: Focus on building a strong product first, then worry about scaling.",
  "Based on your metrics, you should consider optimizing your funnel. Try A/B testing your CTAs.",
  "Your growth is impressive! I'd suggest exploring partnerships to accelerate further.",
  "Have you tried implementing email automation? It could boost your conversions by 30-40%.",
  "Your market timing is perfect. I recommend launching your next campaign soon.",
];

const mockAIResponsesInvestor = [
  "This MSME shows strong fundamentals with solid market traction. I'd rate it as a good investment opportunity.",
  "Based on their financials, the risk level appears moderate to low. They have a clear path to profitability.",
  "The market they're targeting is growing at 25% YoY. Great timing for investment.",
  "Their team experience is exceptional. I recommend considering this deal seriously.",
  "The valuation seems fair given their growth trajectory. This could yield strong returns.",
];

export default function ChatBox({ title = "AI Assistant", placeholder = "Ask me anything...", type = "business" }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your NeuroGrowth AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const responses = type === "investor" ? mockAIResponsesInvestor : mockAIResponsesBusiness;
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/10">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-400">Get AI-powered insights</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.sender === "user"
                  ? "bg-blue-500/30 text-white rounded-br-none border border-blue-400/30"
                  : "bg-white/5 text-gray-100 rounded-bl-none border border-white/10"
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/5 px-4 py-2 rounded-lg rounded-bl-none border border-white/10">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-white/20 bg-white/5 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/10 transition-all text-sm disabled:opacity-50"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            size="sm"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
