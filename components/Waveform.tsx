import { cn } from "@/lib/utils";

const bars = [36, 62, 44, 76, 51, 88, 32, 69, 55, 95, 48, 72, 40, 84, 58, 66, 46, 90, 35, 78];

type WaveformProps = {
  compact?: boolean;
  active?: boolean;
  className?: string;
};

export function Waveform({ compact = false, active = false, className }: WaveformProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 overflow-hidden rounded-lg border border-white/15 bg-black/35 px-3",
        compact ? "h-12" : "h-20",
        className,
      )}
      aria-label="Audio waveform preview"
    >
      {bars.map((height, index) => (
        <span
          key={`${height}-${index}`}
          className={cn(
            "w-full min-w-1 rounded-full",
            active
              ? "sequencer-cell bg-paper"
              : "bg-white/25",
          )}
          style={{ height: `${compact ? Math.max(18, height / 2) : height}%` }}
        />
      ))}
    </div>
  );
}
