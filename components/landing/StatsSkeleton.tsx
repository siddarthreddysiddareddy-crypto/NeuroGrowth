export default function StatsSkeleton() {
  return (
    <div className="w-full h-full flex flex-col gap-4 p-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-2">
        <div className="h-4 w-24 rounded-full bg-white/10" />
        <div className="h-3 w-16 rounded-full bg-white/6" />
      </div>

      {/* Live badge skeleton */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500/40" />
        <div className="h-3 w-20 rounded-full bg-white/8" />
      </div>

      {/* Main stat skeletons */}
      <div className="flex-1 flex flex-col justify-center gap-5 mt-2">
        {[80, 60, 70, 55].map((w, i) => (
          <div key={i} className="space-y-1.5">
            <div className={`h-7 w-${w === 80 ? "3/4" : w === 60 ? "1/2" : w === 70 ? "2/3" : "1/2"} rounded-lg bg-white/10`} />
            <div className="h-2.5 w-1/3 rounded-full bg-white/5" />
          </div>
        ))}
      </div>

      {/* Bottom divider + tick skeleton */}
      <div className="pt-4 border-t border-white/5 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500/30" />
        <div className="h-2.5 w-28 rounded-full bg-white/5" />
      </div>
    </div>
  );
}
