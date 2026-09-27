export type MediaPlaceholder = {
  id: string;
  label: string;
  detail: string;
  tone?: "cool" | "warm" | "neutral";
  src?: string;
  alt?: string;
  position?: string;
};




export type Track = {
  id: string; title: string; genre: string; year: string; note: string;
  artwork: string;
  artworkSrc?: string;
  src?: string;
  rightsReview: boolean;
};




export const portfolio = {
  owner: "Josh Nogen",
  descriptor: "Second-year student at Cal Poly studying finance and minoring in economics and computer science.",
  chapters: [
    { number: "01", title: "Finance", id: "finance", mark: "↗" },
    { number: "02", title: "Music Production", id: "music", mark: "◌" },
    { number: "03", title: "Soccer", id: "soccer", mark: "＋" },
    { number: "04", title: "Cooking", id: "cooking", mark: "◇" },
  ],
  finance: {
    intro: [
      "I am a second-year at Cal Poly studying finance and minoring in economics and computer science. I grew up in Sacramento, CA, where playing comptetive soccer was a huge part of my life.",
      "I've also always loved business; In third grade I was making homeade stressballs with rice and balloons to sell for our classroom currency. In COVID, I started reselling sneakers, clothing, collectibles, and PlayStations. Concurrently, an app named StockX was just starting to emerge, which applied market principles to these items. I used the app constantly to anchor buying decisions and negotiations, where some of my favorite memories came from. You can imagine the faces of some people when seeing the 13-year-old they've been getting hardballed for the past week on.",
      "I knew I wanted to break into finance, so over the past summer, I interned a boutique Private Credit & Private Equity firm to build up my experience and best set me up to do so. I gained experience modeling important portco decisions, fund valuations, all while being a fly on the wall in some really strategic conversations.",
      "Outside of my interests in finance, I love to produce music, play soccer, and have recently been picking up cooking.",
    ],
    portrait: {
      id: "about-portrait",
      label: "Josh Nogen",
      detail: "Cal Poly, San Luis Obispo",
      tone: "cool",
      src: "/api/private-media/headshot.jpg",
      alt: "Josh Nogen in business attire outside a Cal Poly building",
      position: "44% center",
    } satisfies MediaPlaceholder,
    resumeHref: "/api/private-media/josh-nogen-resume.pdf",
    experiences: [
      { index: "A", role: "Summer Analyst", organization: "CVF Capital Partners", period: "Jun - Aug 2026", detail: "Having consistent visibility into portco-specific KPIs is the foundation to value creation. All the strategic insights that I was exposed to in my internship were informed by doing this correctly." },
      { index: "B", role: "Acquisitions Associate Intern", organization: "WaveClaw Capital", period: "Apr - Jun 2026", detail: "In the diligence process, there is an important balance to be struck between two aspects:\n1. Thoroughly testing every downside risk.\n2. Still preserving momentum by communicating a dedicated interest to the seller." },
      { index: "C", role: "Deal Analyst", organization: "Cal Poly Investment Banking", period: "Mar 2026 - Present", detail: "In tech, current financials of targets may not be a core driver of an acquisition. Distribution and ecosystem can be the core asset if a strategic believes they have the unique capability to monetize them." },
    ],
  },
  music: {
    story: [
      {
        text: "For as long as I can remember, I’ve always loved music. My Dad constantly played music around the house, always across different genres. Around middle school, I got really into rap. I thought the sound of 808s was just so good, and the beats quickly made it my favorite genre.",
      },
      {
        text: "One day in 8th grade, I randomly came across the original stream of a famous producer making the beat to a song that everyone knew. It absolutely blew my mind to see someone creating the exact song I knew from software.",
      },
      {
        text: "Before my freshman year of high school, I bought my first production software. I had no clue what I was doing, but I loved it and worked on music whenever I had time. In sophomore year, a soccer injury during the second game of the season left me on crutches. I was devastated, but I figured, why not go all in? I produced every day and eventually got past that common phase where everything sounds horrible.",
      },
      {
        text: "Today, it’s my biggest hobby. To me, there’s nothing like creating art, and music is the form I appreciate most. I’ve found that it’s also become an amazing creative outlet outside of my career efforts.",
      },
    ],
    studio: {
      id: "starting-producing",
      label: "The early setup",
      detail: "My dad’s room; crutches from my sophomore-year soccer injury are visible at left",
      tone: "cool",
      src: "/api/private-media/starting-producing-clean.png",
      alt: "Josh’s early music production setup in his father’s room, with crutches at the left, a guitar, laptop, keyboard, and speakers",
      position: "center top",
    } satisfies MediaPlaceholder,
    project: {
      label: "Original production",
      detail: "Screen recording of a song I made",
      src: "/api/private-media/song-trimmed.mp4",
      type: "video/mp4",
    },
    tracks: [
      { id: "track-1", title: "twitch", genre: "Genre", year: "2026", note: "Underground rap style. One of my favorite genres to produce in!", artwork: "twitch", artworkSrc: "/api/private-media/cover%202.png", src: "/api/private-media/twitch-5-2-26.mp3", rightsReview: false },
      { id: "track-2", title: "Crank That", genre: "Genre", year: "2026", note: "Dance/UK Garage style. A genre I've been listening to a ton recently.", artwork: "Crank That", artworkSrc: "/api/private-media/cover.png", src: "/api/private-media/crank-that.mp3", rightsReview: false },
    ] satisfies Track[],
  },
  soccer: {
    story: "Soccer was a central part of my life growing up, and I think it's something that's really engrained in who I am and how I developed as a person. Many of my most painful, as well as ecstatic moments came from soccer. There's truly so much that I can say about the sport, but there are three things that have carried with me most.\n\nFirst, it made me someone who loves to compete. There's something about those final 5 minutes of the biggest and closest games where you feel absolutely entrenched in every moment. Every play is a battle that just builds on top of itself.\n\nSecond, it let me experience adversity. Going through injuries that take me out for months while watching my team play, crying from losing an excrutiating playoff game, and failures from my part are things that I'm ultimately gratful for. I believe it's built a lot of character that will undoubtedly help me in my life.\n\nLastly, it's made me love being part of team. Many of my closest friends have come from soccer. Because you're always with them, competing besides them, and working together, you build a camraderie that's really special. And because of this, I hope to experience something similar when I step into my career.",
    summary: "Eight years of competitive soccer; Inderkum captain and MVP; two-time First Team All-Conference; received Division II and Division III collegiate offers.",
    goalVideo: {
      label: "Game winning goal in playoffs. One of the best memories of playing soccer.",
      detail: "January 31, 2025",
      src: "/api/private-media/soccer-goal.mp4",
      type: "video/mp4",
    },
    primary: {
      id: "soccer-primary",
      label: "January 14, 2025",
      detail: "",
      tone: "neutral",
      src: "/api/private-media/soccer-action.jpg",
      alt: "Josh wearing number 2 and dribbling the ball during a night soccer match",
      position: "center",
    } satisfies MediaPlaceholder,
    gallery: [
      { id: "soccer-gallery-1", label: "Training portrait", detail: "Post-training photograph", tone: "neutral", src: "/api/private-media/soccer-training.jpg", alt: "Josh smiling after soccer training against a dark night background", position: "center 62%" },
    ] satisfies MediaPlaceholder[],
  },
  cooking: {
    storyTopics: [
      "I have a lot of respect for my Dad's cooking. His medium-rare steak, in particular, is one of my favorite meals on Earth. And over the past year, I've started to come to terms with the fact that I won't be able to have it nearly as often. So last summer, I made sure to get a good teaching session going with him before I headed back to school. It's safe to say that that time has paid off (tremendously).",
      "I've found that pursuing finance sometimes means sacrificing time spent with friends and family, but being able to throw a steak on the grill and cook with them has become a really important hobby for me. The steak plate was really fun to make; all my friends came over and we cooked up everything together. Next time we're making salmon.",
    ],
    process: {
      id: "cooking-process",
      label: "At the grill",
      detail: "Developing the craft through repetition",
      tone: "warm",
      src: "/api/private-media/unnamed.png",
      alt: "Josh cooking at an outdoor grill at night",
      position: "center 45%",
    } satisfies MediaPlaceholder,
    dishes: [
      { id: "dish-tri-tip", title: "Tri-tip", note: "Medium rare, reverse sear on the grill. Was bomb.", src: "/api/private-media/tri-tip.jpg", alt: "Sliced medium-rare tri-tip on a wooden cutting board", position: "center 60%" },
      { id: "dish-steak", title: "Steak plate", note: "Plus jasmine rice, broccolini, baked potatoes, chimmi churri, & tradtitional Peruvian red chile sauce", src: "/api/private-media/steak-dish.jpg", alt: "A plated steak dish with potatoes, broccolini, and sauces", position: "center 58%" },
    ],
  },
  footer: {
    links: [
      { label: "Email", value: "jnogen@calpoly.edu", href: "mailto:jnogen@calpoly.edu" },
      { label: "LinkedIn", value: "josh-nogen", href: "https://www.linkedin.com/in/josh-nogen/" },
      { label: "Résumé", value: "View PDF", href: "/api/private-media/josh-nogen-resume.pdf" },
    ],
    recalc: "Prepared as a private application portfolio for Recalc Finance Accelerator.",
  },
} as const;

export type ChapterId = (typeof portfolio.chapters)[number]["id"];
