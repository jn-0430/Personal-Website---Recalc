"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Heart, MessageCircle, Pause, Play, Send } from "lucide-react";
import { VisualAvatar } from "@/components/VisualAvatar";
import { Waveform } from "@/components/Waveform";
import { producers } from "@/lib/data";

export function QuickClipFeed() {
  const clips = useMemo(
    () =>
      producers.flatMap((producer) =>
        producer.beats.map((beat) => ({
          producer,
          beat,
        })),
      ),
    [],
  );
  const [playingId, setPlayingId] = useState(clips[0]?.beat.id ?? "");
  const [liked, setLiked] = useState<string[]>([]);
  const [commentCounts, setCommentCounts] = useState<Record<string, number>>({});

  return (
    <section className="no-scrollbar overflow-x-auto pb-2">
      <div className="flex snap-x gap-4">
        {clips.map(({ producer, beat }) => {
          const isPlaying = playingId === beat.id;
          const isLiked = liked.includes(beat.id);
          const PlayIcon = isPlaying ? Pause : Play;

          return (
            <article
              key={beat.id}
              className="network-field relative flex min-h-[28rem] w-[82vw] max-w-[22rem] shrink-0 snap-center flex-col justify-end overflow-hidden rounded-lg border border-white/15 bg-[linear-gradient(155deg,rgba(7,26,61,0.98),rgba(2,4,8,0.96))] p-4 shadow-glow"
            >
              <div className="absolute left-4 top-4">
                <VisualAvatar initials={producer.avatar} className="h-12 w-12" />
              </div>
              <div className="absolute right-4 top-4 grid gap-3 text-center text-xs font-semibold text-paper">
                <span>
                  <button
                    onClick={() =>
                      setLiked((current) =>
                        current.includes(beat.id)
                          ? current.filter((id) => id !== beat.id)
                          : [...current, beat.id],
                      )
                    }
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/45 text-paper backdrop-blur transition hover:bg-paper hover:text-ink"
                  >
                    <Heart className={isLiked ? "h-5 w-5 fill-current" : "h-5 w-5"} aria-hidden="true" />
                    <span className="sr-only">Like {beat.title}</span>
                  </button>
                  <span className="mt-1 block">{isLiked ? 1 : 0}</span>
                </span>
                <span>
                  <button
                    onClick={() =>
                      setCommentCounts((current) => ({
                        ...current,
                        [beat.id]: (current[beat.id] ?? 0) + 1,
                      }))
                    }
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/45 text-paper backdrop-blur transition hover:bg-paper hover:text-ink"
                  >
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">Comment on {beat.title}</span>
                  </button>
                  <span className="mt-1 block">{commentCounts[beat.id] ?? 0}</span>
                </span>
                <Link
                  href="/messages"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/45 text-paper backdrop-blur transition hover:bg-paper hover:text-ink"
                >
                  <Send className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">DM {producer.name}</span>
                </Link>
              </div>

              <div className="relative z-10">
                <button
                  onClick={() => setPlayingId(isPlaying ? "" : beat.id)}
                  className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-paper text-ink shadow-outline transition hover:bg-white"
                >
                  <PlayIcon className="h-7 w-7 fill-current" aria-hidden="true" />
                  <span className="sr-only">{isPlaying ? "Pause" : "Play"} {beat.title}</span>
                </button>
                <h2 className="brand-display text-4xl leading-none">{beat.title}</h2>
                <Link href={`/producers/${producer.slug}`} className="mt-2 block text-sm font-semibold text-bone">
                  {producer.name}
                </Link>
                <div className="mt-4">
                  <Waveform active={isPlaying} />
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-mist">
                  <span>{beat.bpm} BPM</span>
                  <span>{beat.key}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
