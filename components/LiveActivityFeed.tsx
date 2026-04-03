"use client";

import { useEffect, useRef } from "react";
import { ActivityEvent } from "@/hooks/useLiveData";

interface Props {
  activities: ActivityEvent[];
  title?: string;
  maxHeight?: string;
}

const typeColors: Record<ActivityEvent["type"], string> = {
  investment: "border-l-green-400 bg-green-500/5",
  campaign:   "border-l-blue-400 bg-blue-500/5",
  conversion: "border-l-purple-400 bg-purple-500/5",
  signup:     "border-l-yellow-400 bg-yellow-500/5",
  ai_insight: "border-l-cyan-400 bg-cyan-500/5",
  deal:       "border-l-orange-400 bg-orange-500/5",
};

const typeDot: Record<ActivityEvent["type"], string> = {
  investment: "bg-green-400",
  campaign:   "bg-blue-400",
  conversion: "bg-purple-400",
  signup:     "bg-yellow-400",
  ai_insight: "bg-cyan-400",
  deal:       "bg-orange-400",
};

export default function LiveActivityFeed({ activities, title = "⚡ Live Activity Feed", maxHeight = "320px" }: Props) {
  const prevLen = useRef(activities.length);
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to top when new event arrives
  useEffect(() => {
    if (activities.length > prevLen.current && listRef.current) {
      listRef.current.scrollTop = 0;
    }
    prevLen.current = activities.length;
  }, [activities]);

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/5">
        <span className="font-semibold text-white text-sm">{title}</span>
        <span className="flex items-center gap-2 text-xs text-green-400 font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          LIVE
        </span>
      </div>

      {/* Feed */}
      <div
        ref={listRef}
        className="overflow-y-auto divide-y divide-white/5 scroll-smooth"
        style={{ maxHeight }}
      >
        {activities.map((event, idx) => (
          <div
            key={event.id}
            className={`flex items-start gap-3 px-4 py-3 border-l-2 transition-all ${typeColors[event.type]} ${
              idx === 0 ? "animate-fadeInDown" : ""
            }`}
            style={{
              animationDuration: "0.4s",
              animationFillMode: "both",
            }}
          >
            {/* Icon */}
            <div className="text-lg mt-0.5 shrink-0">{event.icon}</div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-200 leading-snug">{event.message}</p>
              <p className="text-xs text-gray-500 mt-0.5">{event.time}</p>
            </div>

            {/* Dot */}
            <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${typeDot[event.type]}`} />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInDown {
          animation-name: fadeInDown;
        }
      `}</style>
    </div>
  );
}
