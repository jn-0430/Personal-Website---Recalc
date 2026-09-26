"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock3, Pause, Play, Zap } from "lucide-react";
import type { Beat } from "@/lib/data";
import { Waveform } from "@/components/Waveform";

type BeatCardProps = {
  beat: Beat;
  active?: boolean;
  producerName?: string;
  producerHref?: string;
};

export function BeatCard({ beat, active = false, producerName, producerHref }: BeatCardProps) {
  const [isPlaying, setIsPlaying] = useState(active);
  const PlayIcon = isPlaying ? Pause : Play;

  return (
    <article className="panel p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="brand-display truncate text-xl leading-tight">{beat.title}</h3>
          {producerName && producerHref && (
            <Link href={producerHref} className="mt-1 block truncate text-xs font-semibold text-paper/85 hover:text-white">
              {producerName}
            </Link>
          )}
          <p className="mt-2 text-sm text-mist">
            {beat.bpm} BPM | {beat.key}
          </p>
        </div>
        <button
          onClick={() => setIsPlaying((playing) => !playing)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paper text-ink transition hover:bg-white"
        >
          <PlayIcon className="h-5 w-5 fill-current" aria-hidden="true" />
          <span className="sr-only">{isPlaying ? "Pause" : "Play"} {beat.title}</span>
        </button>
      </div>
      <Waveform active={isPlaying} />
      <div className="mt-4 flex items-center justify-between text-xs text-mist">
        <span className="inline-flex items-center gap-1">
          <Clock3 className="h-4 w-4" aria-hidden="true" />
          {beat.duration}
        </span>
        <span className="inline-flex items-center gap-1">
          <Zap className="h-4 w-4" aria-hidden="true" />
          {beat.energy}%
        </span>
      </div>
    </article>
  );
}
