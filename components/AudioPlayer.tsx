"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2 } from "lucide-react";
import type { Track } from "@/lib/portfolio-data";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
}

export function AudioPlayer({ track, index }: { track: Track; index: number }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const ready = Boolean(track.src);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio || !ready) return;
    if (audio.paused) await audio.play();
    else audio.pause();
  }

  function seek(value: number) {
    const audio = audioRef.current;
    if (!audio || !ready) return;
    audio.currentTime = value;
    setCurrentTime(value);
  }

  return (
    <article className="track" data-reveal>
      <div className={`track-art track-art-${index + 1}${track.artworkSrc ? " has-artwork" : ""}`} aria-label={`${track.artwork} placeholder`}>
        {track.artworkSrc ? <img src={track.artworkSrc} alt={track.artwork} className="track-art-image" /> : <>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <p>{track.artwork}</p>
        </>}
      </div>
      <div className="track-body">
        <div className="track-heading">
          <div>
            <p className="eyebrow">Selected beat / {String(index + 1).padStart(2, "0")}</p>
            <h3>{track.title}</h3>
          </div>
          <span className="track-meta">{track.year}</span>
        </div>
        <p className="track-note">{track.note}</p>
        <div className="audio-controls" data-ready={ready}>
          <button type="button" onClick={togglePlayback} disabled={!ready} aria-label={playing ? `Pause ${track.title}` : `Play ${track.title}`}>
            {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
          </button>
          <span className="timecode">{formatTime(currentTime)}</span>
          <input
            aria-label={`Seek ${track.title}`}
            type="range"
            min={0}
            max={duration || 100}
            value={ready ? currentTime : 0}
            onChange={(event) => seek(Number(event.target.value))}
            disabled={!ready}
          />
          <span className="timecode">{ready ? formatTime(duration) : "--:--"}</span>
          <label className="volume-control">
            <Volume2 size={15} aria-hidden="true" />
            <span className="sr-only">Volume for {track.title}</span>
            <input type="range" min={0} max={1} step={0.05} value={volume} onChange={(event) => setVolume(Number(event.target.value))} disabled={!ready} />
          </label>
        </div>
        {!ready && <p className="audio-status">Audio file needed / Controls activate when a private source is added</p>}
      </div>
      {track.src && (
        <audio
          ref={audioRef}
          src={track.src}
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
          onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
          onEnded={() => setPlaying(false)}
        />
      )}
    </article>
  );
}
