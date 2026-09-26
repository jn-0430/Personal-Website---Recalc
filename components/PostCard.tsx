"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Heart, MessageCircle, Send } from "lucide-react";
import type { Beat, Producer, ProducerPost } from "@/lib/data";
import { VisualAvatar } from "@/components/VisualAvatar";
import { Waveform } from "@/components/Waveform";
import { cn } from "@/lib/utils";

type PostCardProps = {
  post: ProducerPost;
  producer: Producer;
  beat: Beat;
  audioSrc?: string;
  hashtags?: string[];
  metaLabel?: string;
  contentTypeLabel?: string;
  collabStatusLabel?: string;
  sampleRisk?: string;
  masteringTarget?: string;
};

export function PostCard({
  post,
  producer,
  beat,
  audioSrc,
  hashtags = [],
  metaLabel,
  contentTypeLabel,
  collabStatusLabel,
  sampleRisk,
  masteringTarget,
}: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(post.comments);

  return (
    <article className="panel overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-white/15 p-4">
        <Link href={`/producers/${producer.slug}`} className="flex min-w-0 items-center gap-3">
          <VisualAvatar initials={producer.avatar} className="h-11 w-11" />
          <span className="min-w-0">
            <span className="block truncate font-semibold text-paper">{producer.name}</span>
            <span className="block text-xs text-mist">{post.postedAt}</span>
          </span>
        </Link>
        <Link href="/messages" className="secondary-button px-3 py-2">
          <Send className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">DM {producer.name}</span>
        </Link>
      </div>

      <div className="network-field bg-[linear-gradient(145deg,rgba(7,26,61,0.96),rgba(2,4,8,0.95))] p-4">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h2 className="brand-display truncate text-4xl leading-none">{beat.title}</h2>
            <p className="mt-2 text-sm text-bone">{post.caption}</p>
            {(contentTypeLabel || collabStatusLabel || sampleRisk || masteringTarget) && (
              <div className="mt-3 flex flex-wrap gap-2">
                {contentTypeLabel && <span className="pill bg-black/35">{contentTypeLabel}</span>}
                {collabStatusLabel && <span className="pill bg-black/35">{collabStatusLabel}</span>}
                {sampleRisk && <span className="pill bg-black/35">sample {sampleRisk}</span>}
                {masteringTarget && <span className="pill bg-black/35">master {masteringTarget}</span>}
              </div>
            )}
            {hashtags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {hashtags.map((tag) => (
                  <span key={tag} className="text-xs font-semibold text-paper/75">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <span className="shrink-0 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs text-mist">
            {metaLabel ?? beat.bpm}
          </span>
        </div>
        <Waveform active={liked} />
        {audioSrc && (
          <audio
            controls
            src={audioSrc}
            className="mt-4 h-10 w-full rounded-lg"
          />
        )}
      </div>

      <div className="flex items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLiked((current) => !current)}
            className={cn(
              "secondary-button px-3 py-2",
              liked && "bg-paper text-ink hover:bg-white hover:text-ink",
            )}
          >
            <Heart className={cn("h-4 w-4", liked && "fill-current")} aria-hidden="true" />
            <span>{post.likes + (liked ? 1 : 0)}</span>
          </button>
          <button
            onClick={() => setComments((current) => current + 1)}
            className="secondary-button px-3 py-2"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>{comments}</span>
          </button>
        </div>
        <Link href={`/producers/${producer.slug}`} className="secondary-button px-3 py-2">
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">{producer.name} profile</span>
        </Link>
      </div>
    </article>
  );
}
