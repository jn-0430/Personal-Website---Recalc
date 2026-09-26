import Link from "next/link";
import { MapPin, Music2 } from "lucide-react";
import type { Producer } from "@/lib/data";
import { VisualAvatar } from "@/components/VisualAvatar";

type ProducerCardProps = {
  producer: Producer;
};

export function ProducerCard({ producer }: ProducerCardProps) {
  return (
    <Link href={`/producers/${producer.slug}`} className="panel block p-4 transition hover:-translate-y-1 hover:border-white/35">
      <div className="flex items-center gap-3">
        <VisualAvatar initials={producer.avatar} className="h-14 w-14" />
        <div className="min-w-0">
          <h3 className="brand-display truncate text-2xl leading-none">{producer.name}</h3>
          <p className="mt-2 flex items-center gap-1 text-xs text-mist">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {producer.location}
          </p>
        </div>
      </div>
      <p className="mt-4 line-clamp-2 text-sm leading-6 text-bone">{producer.bio}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {producer.genres.slice(0, 3).map((genre) => (
          <span key={genre} className="pill">
            {genre}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-paper">
        <Music2 className="h-4 w-4" aria-hidden="true" />
        {producer.beats.length} beat snippets
      </div>
    </Link>
  );
}
