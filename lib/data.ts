export type Beat = {
  id: string;
  title: string;
  bpm: number;
  key: string;
  mood: string;
  duration: string;
  energy: number;
};

export type Producer = {
  id: string;
  slug: string;
  name: string;
  avatar: string;
  bio: string;
  genres: string[];
  affiliations: string[];
  daw: string;
  location: string;
  availability: string;
  credits: string;
  links: {
    soundcloud: string;
    instagram: string;
    youtube: string;
    beatstars: string;
  };
  beats: Beat[];
};

export type Conversation = {
  id: string;
  producerSlug: string;
  unread: number;
  messages: Array<{
    from: "me" | "them";
    text: string;
    time: string;
  }>;
};

export type ProducerPost = {
  id: string;
  producerSlug: string;
  beatId: string;
  caption: string;
  postedAt: string;
  likes: number;
  comments: number;
};

export type LiveRoom = {
  id: string;
  producerSlug: string;
  beatId: string;
  title: string;
  viewers: number;
  topic: string;
  chat: Array<{
    name: string;
    text: string;
  }>;
};

export const producers: Producer[] = [
  {
    id: "p1",
    slug: "maya-noir",
    name: "Maya Noir",
    avatar: "MN",
    bio: "Builds smoky R&B textures, clean drum pockets, and late-night vocal beds for artists who want space around the hook.",
    genres: ["R&B", "Alt Pop", "Neo Soul"],
    affiliations: ["alt rnb", "la writers", "late night soul"],
    daw: "Ableton Live",
    location: "Los Angeles, CA",
    availability: "Open to topliners and vocal producers",
    credits: "Placements with indie R&B artists and sync libraries",
    links: {
      soundcloud: "https://soundcloud.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      beatstars: "https://beatstars.com",
    },
    beats: [
      {
        id: "b1",
        title: "Velvet Metro",
        bpm: 92,
        key: "F minor",
        mood: "Warm, nocturnal",
        duration: "0:28",
        energy: 68,
      },
      {
        id: "b2",
        title: "Glass Room",
        bpm: 104,
        key: "A minor",
        mood: "Floaty, intimate",
        duration: "0:31",
        energy: 54,
      },
    ],
  },
  {
    id: "p2",
    slug: "jet-lane",
    name: "Jet Lane",
    avatar: "JL",
    bio: "Trap and club producer with punchy 808s, glossy synth leads, and hooks that leave room for aggressive flows.",
    genres: ["Trap", "Club Rap", "Drill"],
    affiliations: ["atlanta trap", "underground rap", "808 club"],
    daw: "FL Studio",
    location: "Atlanta, GA",
    availability: "Looking for rappers and mix engineers",
    credits: "BeatStars top 20 weekly kit feature",
    links: {
      soundcloud: "https://soundcloud.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      beatstars: "https://beatstars.com",
    },
    beats: [
      {
        id: "b3",
        title: "Chrome Sprint",
        bpm: 142,
        key: "C sharp minor",
        mood: "Fast, metallic",
        duration: "0:24",
        energy: 91,
      },
      {
        id: "b4",
        title: "Low Orbit",
        bpm: 150,
        key: "D minor",
        mood: "Dark, bouncy",
        duration: "0:27",
        energy: 83,
      },
    ],
  },
  {
    id: "p3",
    slug: "sola-keys",
    name: "Sola Keys",
    avatar: "SK",
    bio: "Keyboard-first producer blending jazz chords, house drums, and organic bass lines for polished dance records.",
    genres: ["House", "Jazz Rap", "Afrobeats"],
    affiliations: ["ukg", "brooklyn house", "jazz rap"],
    daw: "Logic Pro",
    location: "Brooklyn, NY",
    availability: "Open to remix swaps",
    credits: "Live keys for touring soul acts",
    links: {
      soundcloud: "https://soundcloud.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      beatstars: "https://beatstars.com",
    },
    beats: [
      {
        id: "b5",
        title: "Sunset Chords",
        bpm: 118,
        key: "G major",
        mood: "Bright, moving",
        duration: "0:32",
        energy: 75,
      },
      {
        id: "b6",
        title: "Palm Bounce",
        bpm: 108,
        key: "E minor",
        mood: "Airy, percussive",
        duration: "0:29",
        energy: 72,
      },
    ],
  },
  {
    id: "p4",
    slug: "nova-drift",
    name: "Nova Drift",
    avatar: "ND",
    bio: "Experimental pop producer turning chopped vocals, granular pads, and strange percussion into catchy left-field tracks.",
    genres: ["Hyperpop", "Experimental", "Electronic"],
    affiliations: ["hyperpop", "internet underground", "glitch club"],
    daw: "Ableton Live",
    location: "Portland, OR",
    availability: "Searching for visual artists and singers",
    credits: "Underground electronic compilation features",
    links: {
      soundcloud: "https://soundcloud.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      beatstars: "https://beatstars.com",
    },
    beats: [
      {
        id: "b7",
        title: "Signal Bloom",
        bpm: 132,
        key: "B minor",
        mood: "Glitchy, sweet",
        duration: "0:26",
        energy: 88,
      },
      {
        id: "b8",
        title: "Static Garden",
        bpm: 126,
        key: "F sharp minor",
        mood: "Strange, glossy",
        duration: "0:30",
        energy: 79,
      },
    ],
  },
  {
    id: "p5",
    slug: "ronin-wav",
    name: "Ronin Wav",
    avatar: "RW",
    bio: "Cinematic boom bap and sample-based loops with dusty drums, vinyl color, and tense soundtrack moments.",
    genres: ["Boom Bap", "Lo-Fi", "Cinematic"],
    affiliations: ["underground rap", "dusty loops", "chicago beats"],
    daw: "MPC + Pro Tools",
    location: "Chicago, IL",
    availability: "Open to sample pack collabs",
    credits: "Scored short films and podcast themes",
    links: {
      soundcloud: "https://soundcloud.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      beatstars: "https://beatstars.com",
    },
    beats: [
      {
        id: "b9",
        title: "Rain Check",
        bpm: 86,
        key: "D minor",
        mood: "Dusty, focused",
        duration: "0:35",
        energy: 61,
      },
      {
        id: "b10",
        title: "Film Grain",
        bpm: 78,
        key: "G minor",
        mood: "Moody, textured",
        duration: "0:33",
        energy: 57,
      },
    ],
  },
  {
    id: "p6",
    slug: "isla-rook",
    name: "Isla Rook",
    avatar: "IR",
    bio: "Bassline and UKG producer making clipped vocal hooks, swung drums, and late-night club tools.",
    genres: ["UKG", "Garage", "Grime"],
    affiliations: ["ukg", "london grime", "bassline"],
    daw: "Ableton Live",
    location: "London, UK",
    availability: "Open to MCs and vocalists",
    credits: "Pirate radio guest mixes and white-label club edits",
    links: {
      soundcloud: "https://soundcloud.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      beatstars: "https://beatstars.com",
    },
    beats: [
      {
        id: "b11",
        title: "Night Bus",
        bpm: 132,
        key: "F minor",
        mood: "Swung, gritty",
        duration: "0:29",
        energy: 86,
      },
      {
        id: "b12",
        title: "Pirate Dub",
        bpm: 138,
        key: "C minor",
        mood: "Sparse, heavy",
        duration: "0:31",
        energy: 82,
      },
    ],
  },
  {
    id: "p7",
    slug: "kofi-metro",
    name: "Kofi Metro",
    avatar: "KM",
    bio: "Percussion-led producer blending afrobeats, alte textures, and dancehall bounce for bright vocal records.",
    genres: ["Afrobeats", "Alte", "Dancehall"],
    affiliations: ["lagos alte", "afro-fusion", "percussion"],
    daw: "Logic Pro",
    location: "Lagos, Nigeria",
    availability: "Looking for singers and percussionists",
    credits: "Independent afro-fusion releases and producer camps",
    links: {
      soundcloud: "https://soundcloud.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      beatstars: "https://beatstars.com",
    },
    beats: [
      {
        id: "b13",
        title: "Mainland Glow",
        bpm: 104,
        key: "A major",
        mood: "Bright, percussive",
        duration: "0:30",
        energy: 78,
      },
      {
        id: "b14",
        title: "Palm Radio",
        bpm: 112,
        key: "E minor",
        mood: "Warm, rolling",
        duration: "0:28",
        energy: 74,
      },
    ],
  },
  {
    id: "p8",
    slug: "yuna-park",
    name: "Yuna Park",
    avatar: "YP",
    bio: "Pop producer building polished topline demos, Jersey-influenced drums, and glossy synth arrangements.",
    genres: ["K-Pop", "Jersey Club", "Electronic"],
    affiliations: ["seoul pop", "jersey bounce", "idol demos"],
    daw: "Cubase",
    location: "Seoul, South Korea",
    availability: "Open to topliners and choreo-friendly tracks",
    credits: "Demo cuts for indie pop writers",
    links: {
      soundcloud: "https://soundcloud.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      beatstars: "https://beatstars.com",
    },
    beats: [
      {
        id: "b15",
        title: "Mirror Step",
        bpm: 150,
        key: "B minor",
        mood: "Glossy, kinetic",
        duration: "0:25",
        energy: 90,
      },
      {
        id: "b16",
        title: "Neon Demo",
        bpm: 124,
        key: "D major",
        mood: "Clean, bright",
        duration: "0:32",
        energy: 77,
      },
    ],
  },
  {
    id: "p9",
    slug: "asha-kline",
    name: "Asha Kline",
    avatar: "AK",
    bio: "Modular producer focused on ambient techno, hypnotic percussion, and spacious club transitions.",
    genres: ["Techno", "Ambient", "Experimental"],
    affiliations: ["berlin club", "ambient techno", "modular"],
    daw: "Bitwig",
    location: "Berlin, Germany",
    availability: "Open to live set swaps",
    credits: "Underground club compilations and modular streams",
    links: {
      soundcloud: "https://soundcloud.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      beatstars: "https://beatstars.com",
    },
    beats: [
      {
        id: "b17",
        title: "Concrete Bloom",
        bpm: 126,
        key: "G minor",
        mood: "Hypnotic, textured",
        duration: "0:34",
        energy: 69,
      },
      {
        id: "b18",
        title: "Station Air",
        bpm: 122,
        key: "C minor",
        mood: "Deep, patient",
        duration: "0:36",
        energy: 63,
      },
    ],
  },
  {
    id: "p10",
    slug: "rio-vale",
    name: "Rio Vale",
    avatar: "RV",
    bio: "Baile funk and Latin trap producer with sharp percussion, crowd chants, and club-ready drops.",
    genres: ["Baile Funk", "Latin Trap", "House"],
    affiliations: ["baile funk", "sao paulo club", "latin drums"],
    daw: "FL Studio",
    location: "Sao Paulo, Brazil",
    availability: "Open to DJs and remixers",
    credits: "Club edits for Brazilian dance collectives",
    links: {
      soundcloud: "https://soundcloud.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      beatstars: "https://beatstars.com",
    },
    beats: [
      {
        id: "b19",
        title: "Rua Motion",
        bpm: 130,
        key: "D minor",
        mood: "Percussive, loud",
        duration: "0:27",
        energy: 92,
      },
      {
        id: "b20",
        title: "Sirena Flip",
        bpm: 128,
        key: "A minor",
        mood: "Fast, playful",
        duration: "0:26",
        energy: 88,
      },
    ],
  },
  {
    id: "p11",
    slug: "theo-north",
    name: "Theo North",
    avatar: "TN",
    bio: "Moody pluggnb producer making soft synth loops, glossy keys, and sparse drums for melodic rap.",
    genres: ["PluggnB", "Cloud Rap", "R&B"],
    affiliations: ["toronto underground", "pluggnb", "moody rnb"],
    daw: "FL Studio",
    location: "Toronto, Canada",
    availability: "Open for melody loops",
    credits: "Loop packs and underground placements",
    links: {
      soundcloud: "https://soundcloud.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      beatstars: "https://beatstars.com",
    },
    beats: [
      {
        id: "b21",
        title: "Snowline",
        bpm: 142,
        key: "F sharp minor",
        mood: "Soft, icy",
        duration: "0:28",
        energy: 70,
      },
      {
        id: "b22",
        title: "North Window",
        bpm: 136,
        key: "E minor",
        mood: "Glossy, sparse",
        duration: "0:31",
        energy: 67,
      },
    ],
  },
];

export const currentUser: Producer = {
  id: "me",
  slug: "juno-wave",
  name: "Juno Wave",
  avatar: "JW",
  bio: "Producer focused on melodic trap, vocal chops, and clean arrangements for artists building an early catalog.",
  genres: ["Melodic Trap", "Pop Rap", "R&B"],
  affiliations: ["underground rap", "atlanta trap", "college scenes"],
  daw: "FL Studio",
  location: "San Luis Obispo, CA",
  availability: "Open for remote sessions this week",
  credits: "Independent releases and campus artist projects",
  links: {
    soundcloud: "https://soundcloud.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    beatstars: "https://beatstars.com",
  },
  beats: [
    {
      id: "my1",
      title: "Night Lens",
      bpm: 140,
      key: "A minor",
      mood: "Melodic, glossy",
      duration: "0:30",
      energy: 82,
    },
    {
      id: "my2",
      title: "After Hours Kit",
      bpm: 96,
      key: "E minor",
      mood: "Smooth, spacious",
      duration: "0:34",
      energy: 66,
    },
  ],
};

export const conversations: Conversation[] = [
  {
    id: "c1",
    producerSlug: "maya-noir",
    unread: 2,
    messages: [
      {
        from: "them",
        text: "Your drums on Night Lens are clean. Want to try that pocket under an R&B topline?",
        time: "10:14 AM",
      },
      {
        from: "me",
        text: "Yes. Send the vocal key and tempo. I can flip a version tonight.",
        time: "10:22 AM",
      },
      {
        from: "them",
        text: "Perfect. A minor, around 92 BPM. I will send a rough bounce.",
        time: "10:30 AM",
      },
    ],
  },
  {
    id: "c2",
    producerSlug: "jet-lane",
    unread: 0,
    messages: [
      {
        from: "me",
        text: "Chrome Sprint is wild. I have a hook idea that needs those 808 slides.",
        time: "Yesterday",
      },
      {
        from: "them",
        text: "Bet. I can send stems after I tighten the intro.",
        time: "Yesterday",
      },
    ],
  },
  {
    id: "c3",
    producerSlug: "sola-keys",
    unread: 1,
    messages: [
      {
        from: "them",
        text: "Would you be down to trade stems? I can add keys to your pop rap ideas.",
        time: "Mon",
      },
      {
        from: "me",
        text: "Absolutely. I need warmer chords on a chorus section.",
        time: "Mon",
      },
    ],
  },
];

export const producerPosts: ProducerPost[] = [
  {
    id: "post-1",
    producerSlug: "maya-noir",
    beatId: "b1",
    caption: "late night pocket, needs a soft hook",
    postedAt: "12m",
    likes: 128,
    comments: 18,
  },
  {
    id: "post-2",
    producerSlug: "jet-lane",
    beatId: "b3",
    caption: "808s are doing most of the talking here",
    postedAt: "28m",
    likes: 246,
    comments: 31,
  },
  {
    id: "post-3",
    producerSlug: "sola-keys",
    beatId: "b5",
    caption: "keys first, drums after. looking for a verse",
    postedAt: "1h",
    likes: 98,
    comments: 12,
  },
  {
    id: "post-4",
    producerSlug: "nova-drift",
    beatId: "b7",
    caption: "glitch pop idea from last night",
    postedAt: "2h",
    likes: 176,
    comments: 22,
  },
  {
    id: "post-5",
    producerSlug: "ronin-wav",
    beatId: "b9",
    caption: "dusty loop for a cold open",
    postedAt: "3h",
    likes: 84,
    comments: 9,
  },
  {
    id: "post-6",
    producerSlug: "isla-rook",
    beatId: "b11",
    caption: "ukg loop for an mc, needs a sharp hook",
    postedAt: "4h",
    likes: 121,
    comments: 16,
  },
  {
    id: "post-7",
    producerSlug: "kofi-metro",
    beatId: "b13",
    caption: "percussion bounce, open to toplines",
    postedAt: "5h",
    likes: 204,
    comments: 27,
  },
  {
    id: "post-8",
    producerSlug: "yuna-park",
    beatId: "b15",
    caption: "jersey bounce demo for a pop chorus",
    postedAt: "6h",
    likes: 189,
    comments: 21,
  },
];

export const liveRooms: LiveRoom[] = [
  {
    id: "live-1",
    producerSlug: "maya-noir",
    beatId: "b1",
    title: "tracking hooks",
    viewers: 184,
    topic: "R&B writers and vocal stacks",
    chat: [
      { name: "kito", text: "that pad is soft" },
      { name: "aria", text: "send this to a topliner" },
      { name: "mn", text: "drop hook ideas" },
    ],
  },
  {
    id: "live-2",
    producerSlug: "jet-lane",
    beatId: "b3",
    title: "808 lab",
    viewers: 327,
    topic: "Trap drums and punchy mix notes",
    chat: [
      { name: "duce", text: "slide is crazy" },
      { name: "mae", text: "needs one more open verse" },
      { name: "lane", text: "who wants stems?" },
    ],
  },
  {
    id: "live-3",
    producerSlug: "sola-keys",
    beatId: "b5",
    title: "house bounce",
    viewers: 209,
    topic: "UKG, house keys, remix swaps",
    chat: [
      { name: "niko", text: "ukg pocket?" },
      { name: "sola", text: "yeah two-step drums next" },
      { name: "beam", text: "bassline could move more" },
    ],
  },
  {
    id: "live-4",
    producerSlug: "nova-drift",
    beatId: "b7",
    title: "glitch room",
    viewers: 156,
    topic: "Experimental pop textures",
    chat: [
      { name: "violet", text: "vocal chop is sticky" },
      { name: "drift", text: "looking for a bridge idea" },
      { name: "cache", text: "send the stems" },
    ],
  },
  {
    id: "live-5",
    producerSlug: "isla-rook",
    beatId: "b11",
    title: "garage cuts",
    viewers: 231,
    topic: "UKG, grime vocals, and bassline drops",
    chat: [
      { name: "skeen", text: "needs an mc" },
      { name: "isla", text: "send bars" },
      { name: "rue", text: "swing is right" },
    ],
  },
  {
    id: "live-6",
    producerSlug: "rio-vale",
    beatId: "b19",
    title: "funk lab",
    viewers: 298,
    topic: "Baile drums and club edits",
    chat: [
      { name: "luca", text: "chant before the drop" },
      { name: "rio", text: "need a dj tag" },
      { name: "bia", text: "this moves" },
    ],
  },
];

export function getProducerBySlug(slug: string) {
  return producers.find((producer) => producer.slug === slug);
}
