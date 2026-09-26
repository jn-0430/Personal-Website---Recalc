import type { Beat, ProducerPost } from "@/lib/data";

export type UploadContentType = "beat" | "song" | "drum-kit" | "plugin" | "effect";
export type UploadCollabStatus = "finished" | "unfinished-loop" | "needs-drums" | "needs-mix" | "open-collab";
export type SampleRisk = "low" | "medium" | "high";

export type SampleScan = {
  risk: SampleRisk;
  summary: string;
  detectedTerms: string[];
  originalArtist: {
    name: string;
    contact: string;
    work: string;
  };
  lawyer: {
    name: string;
    contact: string;
  };
  steps: string[];
};

export type MasteringRequest = {
  enabled: boolean;
  prompt: string;
  target: string;
  chain: string[];
  notes: string;
};

export type UploadedBeatPost = {
  id: string;
  name: string;
  genre: string;
  hashtags: string[];
  contentType: UploadContentType;
  collabStatus: UploadCollabStatus;
  collabNote: string;
  fileName: string;
  fileType: string;
  audioDataUrl?: string;
  sampleScan: SampleScan;
  mastering: MasteringRequest;
  postedAt: string;
  likes: number;
  comments: number;
};

export const uploadedPostsStorageKey = "cnct.uploadedBeatPosts";

export const masteringPresets = [
  "loud club master with tight low end",
  "warm streaming master with smooth vocals",
  "dark underground mix, keep the 808 gritty",
  "clean radio master with wider hooks",
];

export function parseHashtags(value: string) {
  return value
    .split(/[\s,]+/)
    .map((tag) => tag.trim().replace(/^#/, ""))
    .filter(Boolean)
    .map((tag) => `#${tag}`);
}

export function getUploadedPosts() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawPosts = window.localStorage.getItem(uploadedPostsStorageKey);
    const parsedPosts = rawPosts ? (JSON.parse(rawPosts) as UploadedBeatPost[]) : [];
    return Array.isArray(parsedPosts) ? parsedPosts.map(normalizeUploadedPost) : [];
  } catch {
    return [];
  }
}

export function saveUploadedPost(post: UploadedBeatPost) {
  const currentPosts = getUploadedPosts();
  window.localStorage.setItem(uploadedPostsStorageKey, JSON.stringify([post, ...currentPosts]));
  window.dispatchEvent(new Event("cnct-uploaded-posts-updated"));
}

export function uploadedPostToFeedPost(post: UploadedBeatPost): ProducerPost {
  return {
    id: post.id,
    producerSlug: "juno-wave",
    beatId: post.id,
    caption: post.collabNote || collabStatusLabels[post.collabStatus],
    postedAt: post.postedAt,
    likes: post.likes,
    comments: post.comments,
  };
}

export function uploadedPostToBeat(post: UploadedBeatPost): Beat {
  return {
    id: post.id,
    title: post.name,
    bpm: 0,
    key: post.genre,
    mood: post.fileName,
    duration: contentTypeLabels[post.contentType],
    energy: 72,
  };
}

export const contentTypeLabels: Record<UploadContentType, string> = {
  beat: "Beat",
  song: "Song",
  "drum-kit": "Drum kit",
  plugin: "Plugin",
  effect: "Effect",
};

export const collabStatusLabels: Record<UploadCollabStatus, string> = {
  finished: "Finished",
  "unfinished-loop": "Unfinished loop",
  "needs-drums": "Needs drums",
  "needs-mix": "Needs mix",
  "open-collab": "Open collab",
};

export function scanForSamples(input: {
  name: string;
  genre: string;
  hashtags: string[];
  fileName: string;
  contentType: UploadContentType;
}): SampleScan {
  const text = `${input.name} ${input.genre} ${input.hashtags.join(" ")} ${input.fileName}`.toLowerCase();
  const watchTerms = ["sample", "flip", "remix", "bootleg", "interpolation", "vinyl", "chop", "loop"];
  const detectedTerms = watchTerms.filter((term) => text.includes(term));
  const isMusicPost = input.contentType === "beat" || input.contentType === "song";
  const risk: SampleRisk = isMusicPost ? "high" : "low";
  const summary = isMusicPost
    ? "Potential match found: the upload may contain a sample from Luna Vale's Midnight Signal. Clear before posting publicly."
    : "No sample scan needed for this asset type.";

  return {
    risk,
    summary,
    detectedTerms: detectedTerms.length > 0 ? detectedTerms : isMusicPost ? ["sample", "chop"] : [],
    originalArtist: {
      name: "Luna Vale",
      contact: "clearance@lunavale.music",
      work: "Midnight Signal",
    },
    lawyer: {
      name: "Mara Chen, Esq.",
      contact: "mara@chenmusiclaw.com",
    },
    steps: [
      "Email Luna Vale's clearance contact with your private link, usage plan, release date, and expected splits.",
      "Ask for master recording clearance and composition/publishing clearance in writing.",
      "Send the draft terms to Mara Chen, Esq. before you post or monetize the beat.",
      "For an interpolation or replay, clear the composition and confirm no original recording audio was used.",
      "If rights cannot be cleared, replace the sample or keep the post private for collaboration only.",
    ],
  };
}

export function generateMasteringRequest(prompt: string): MasteringRequest {
  const cleanPrompt = prompt.trim();
  const text = cleanPrompt.toLowerCase();
  const chain = ["Gain stage to -6 dB headroom", "Sub cleanup below 25 Hz"];

  if (text.includes("loud") || text.includes("club")) {
    chain.push("Multiband compression for low-mid control", "Limiter target around -8 LUFS");
  } else {
    chain.push("Transparent bus compression", "Limiter target around -12 LUFS");
  }

  if (text.includes("warm") || text.includes("analog")) {
    chain.push("Tape saturation on mids");
  }

  if (text.includes("wide") || text.includes("stereo")) {
    chain.push("Stereo widening above 180 Hz");
  }

  if (text.includes("808") || text.includes("low end") || text.includes("bass")) {
    chain.push("Mono sub focus and 808 transient control");
  }

  if (text.includes("vocal")) {
    chain.push("Presence lift around vocal range");
  }

  return {
    enabled: cleanPrompt.length > 0,
    prompt: cleanPrompt,
    target: text.includes("club") || text.includes("loud") ? "club loud" : "streaming balanced",
    chain,
    notes: cleanPrompt
      ? `AI mastering will prioritize: ${cleanPrompt}`
      : "No AI mastering prompt added.",
  };
}

function normalizeUploadedPost(post: UploadedBeatPost): UploadedBeatPost {
  const contentType = post.contentType ?? "beat";
  const collabStatus = post.collabStatus ?? "finished";
  const normalizedPost = {
    ...post,
    contentType,
    collabStatus,
    collabNote: post.collabNote ?? "",
  };

  return {
    ...normalizedPost,
    sampleScan:
      post.sampleScan ??
      scanForSamples({
        name: post.name,
        genre: post.genre,
        hashtags: post.hashtags,
        fileName: post.fileName,
        contentType,
      }),
    mastering: post.mastering ?? generateMasteringRequest(""),
  };
}
