import React from "react";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Card({ title, children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-card/50 backdrop-blur-sm border border-primary-light/20 rounded-xl p-6 shadow-soft hover:shadow-lg hover:scale-105 transition-all duration-300 ${className}`}
    >
      {title && (
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
