"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Context ─────────────────────────────────────────────────────────────────
export type ViewMode = "business" | "investor";

interface ViewContextValue {
  view: ViewMode;
  setView: (v: ViewMode) => void;
}

export const ViewContext = createContext<ViewContextValue>({
  view: "business",
  setView: () => {},
});

export function useView() {
  return useContext(ViewContext);
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function ViewProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<ViewMode>("business");

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
}

// ─── Toggle Component ─────────────────────────────────────────────────────────
const VIEWS: { id: ViewMode; label: string; emoji: string; color: string }[] = [
  {
    id: "business",
    label: "For Business",
    emoji: "🏢",
    color: "rgba(59,130,246,0.9)",
  },
  {
    id: "investor",
    label: "For Investors",
    emoji: "💰",
    color: "rgba(16,185,129,0.9)",
  },
];

export default function ViewToggle() {
  const { view, setView } = useView();

  return (
    <div
      className="relative flex items-center gap-1 p-1 rounded-2xl"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {VIEWS.map((v) => {
        const isActive = view === v.id;
        return (
          <button
            key={v.id}
            id={`view-toggle-${v.id}`}
            onClick={() => setView(v.id)}
            className="relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 z-10"
            style={{
              color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
            }}
            aria-pressed={isActive}
          >
            {/* Framer Motion sliding pill — layoutId keeps it animated across mounts */}
            {isActive && (
              <motion.div
                layoutId="active-view-pill"
                className="absolute inset-0 rounded-xl"
                style={{
                  background:
                    v.id === "business"
                      ? "linear-gradient(135deg, rgba(59,130,246,0.8) 0%, rgba(139,92,246,0.6) 100%)"
                      : "linear-gradient(135deg, rgba(16,185,129,0.8) 0%, rgba(59,130,246,0.6) 100%)",
                  boxShadow:
                    v.id === "business"
                      ? "0 4px 24px rgba(59,130,246,0.4)"
                      : "0 4px 24px rgba(16,185,129,0.4)",
                }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10 text-base">{v.emoji}</span>
            <span className="relative z-10">{v.label}</span>
          </button>
        );
      })}

      {/* Glow indicator dot */}
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full"
          style={{
            background:
              view === "business" ? "#60a5fa" : "#34d399",
            boxShadow:
              view === "business"
                ? "0 0 8px 2px rgba(96,165,250,0.6)"
                : "0 0 8px 2px rgba(52,211,153,0.6)",
          }}
        />
      </AnimatePresence>
    </div>
  );
}
