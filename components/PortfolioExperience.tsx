"use client";

/* Authenticated media cannot use Next Image optimization because the optimizer does not inherit the viewer's private session. */
/* eslint-disable @next/next/no-img-element */

import { CSSProperties, MouseEvent, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowDownRight, ArrowLeft, ArrowRight, Expand, LogOut, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { AudioPlayer } from "@/components/AudioPlayer";
import { portfolio, type ChapterId, type MediaPlaceholder as MediaItem } from "@/lib/portfolio-data";

function SectionIntro({ number, label, title, copy }: { number: string; label: string; title?: string; copy?: string }) {
  return (
    <header className="section-intro" data-reveal>
      <div className="section-index"><span>{number}</span><span>{label}</span></div>
      {title && <h2 id={`${label.toLowerCase().replace(/\s/g, "-")}-title`}>{title}</h2>}
      {copy && <p>{copy}</p>}
    </header>
  );
}

function MediaPlaceholder({ item, className = "", onOpen }: { item: MediaItem; className?: string; onOpen?: (item: MediaItem) => void }) {
  const content = <>{item.src ? <img className="media-photo" src={item.src} alt="" style={{ objectPosition: item.position }} /> : <div className="media-cross" aria-hidden="true"><span /><span /></div>}{!item.src && (item.label || item.detail) && <div className="media-label"><span>{item.label}</span><small>{item.detail}</small></div>}{onOpen && <Expand className="media-expand" size={17} aria-hidden="true" />}</>;
  const label = item.src ? `Open ${item.label}` : `Open ${item.label} placeholder`;
  return onOpen ? <button type="button" className={`media-placeholder tone-${item.tone || "neutral"} ${item.src ? "has-media" : ""} ${className}`} onClick={() => onOpen(item)} aria-label={label}>{content}</button> : <div className={`media-placeholder tone-${item.tone || "neutral"} ${item.src ? "has-media" : ""} ${className}`}>{content}</div>;
}

function ProjectVideo({ src, label, detail, type = "video/webm", className = "" }: { src: string; label: string; detail: string; type?: string; className?: string }) {
  return (
    <figure className={`project-video ${className}`}>
      <figcaption><span>{label}</span><small>{detail}</small></figcaption>
      <div className="project-video-frame">
        <video controls playsInline preload="metadata" aria-label={label}>
          <source src={src} type={type} />
        </video>
      </div>
    </figure>
  );
}

export function PortfolioExperience() {
  const router = useRouter();
  const [active, setActive] = useState<ChapterId>("finance");
  const [lightbox, setLightbox] = useState<MediaItem | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));
    const sectionObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        setActive(entry.target.id === "top" || entry.target.id === "index" ? "finance" : entry.target.id as ChapterId);
      }),
      { rootMargin: "-35% 0px -55% 0px" },
    );
    ["top", "index", ...portfolio.chapters.map(({ id }) => id)].forEach((id) => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });
    return () => { revealObserver.disconnect(); sectionObserver.disconnect(); };
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const previousOverflow = document.body.style.overflow;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
      previousFocusRef.current?.focus();
    };
  }, [lightbox]);

  function moveHeroLight(event: MouseEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  const activeIndex = portfolio.chapters.findIndex((chapter) => chapter.id === active);

  return (
    <main className="portfolio-shell">
      <a className="skip-link" href="#content">Skip to content</a>
      <nav className="site-nav" aria-label="Primary navigation">
        <a href="#top" className="monogram" aria-label="Josh Nogen, top of page">JN</a>
        <div className="nav-chapters">
          {portfolio.chapters.map((chapter) => <a key={chapter.id} href={`#${chapter.id}`} aria-current={active === chapter.id ? "location" : undefined}><span>{chapter.number}</span>{chapter.title}</a>)}
        </div>
        <button type="button" className="logout-button" onClick={logout}><LogOut size={14} aria-hidden="true" /><span>Exit</span></button>
      </nav>
      <aside className="chapter-progress" aria-label="Current chapter"><span>{String(activeIndex + 1).padStart(2, "0")}</span><div><i style={{ transform: `scaleX(${(activeIndex + 1) / portfolio.chapters.length})` }} /></div><span>04</span></aside>

      <header id="top" className="hero" onMouseMove={moveHeroLight} style={{ "--pointer-x": "68%", "--pointer-y": "38%" } as CSSProperties}>
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-name" aria-label="Josh Nogen"><span>Josh</span><span>Nogen</span></div>
        <div className="hero-lower">
          <p>{portfolio.descriptor}</p>
          <MediaPlaceholder item={{ id: "portrait", label: "Josh Nogen", detail: "Cal Poly, San Luis Obispo", tone: "cool", src: "/api/private-media/headshot.jpg", alt: "Josh Nogen in business attire outside a Cal Poly building", position: "54% center" }} className="hero-portrait" onOpen={setLightbox} />
          <a className="explore-cue" href="#index"><span>Explore</span><ArrowDown size={18} aria-hidden="true" /></a>
        </div>
      </header>

      <div id="content">
        <section id="index" className="chapter-index" aria-labelledby="chapter-index-title">
          <div className="index-heading" data-reveal><h2 id="chapter-index-title">Aspects<br />about me</h2></div>
          <div className="chapter-grid">
            {portfolio.chapters.map((chapter) => <a key={chapter.id} className={`chapter-card chapter-${chapter.id}`} href={`#${chapter.id}`} data-reveal><span className="chapter-number">{chapter.number}</span><span className="chapter-mark" aria-hidden="true">{chapter.mark}</span><span className="chapter-title">{chapter.title}</span><ArrowDownRight className="chapter-arrow" size={20} aria-hidden="true" /></a>)}
          </div>
        </section>

        <section id="finance" className="chapter-section finance-section" aria-label="About me">
          <SectionIntro number="01" label="About me" />
          <div className="about-intro" data-reveal>
            <div className="about-copy">{portfolio.finance.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<a className="text-link" href={portfolio.finance.resumeHref} target="_blank" rel="noreferrer">View my résumé <ArrowDownRight size={16} /></a></div>
            <MediaPlaceholder item={portfolio.finance.portrait} className="about-portrait" onOpen={setLightbox} />
          </div>
          <div className="experience-list"><div className="list-label"><span>Selected experience</span><span>Biggest Takeaway</span><span>Dates</span></div>{portfolio.finance.experiences.map((experience) => <article key={experience.index} className="experience-row" data-reveal><span className="experience-letter">{experience.index}</span><div><h3>{experience.role}</h3><p>{experience.organization}</p></div><p className="experience-detail">{experience.detail}</p><span className="experience-period">{experience.period}</span></article>)}</div>
          <aside className="market-dashboard-callout" data-reveal>
            <div><p className="eyebrow">Project</p><h3>Markets dashboard</h3><p>I&apos;m currently spending all my tokens making a compact API-informed dashboard following equities, rates, FX, and other macro trends.</p></div>
            <a href="https://nextjs-jn-0430.vercel.app/" target="_blank" rel="noreferrer">Open dashboard <ArrowDownRight size={16} aria-hidden="true" /></a>
          </aside>
        </section>

        <section id="music" className="chapter-section music-section" aria-labelledby="music-production-title">
          <SectionIntro number="02" label="Music production" />
          <div className="music-process"><div className="topic-card" data-reveal><div className="music-story">{portfolio.music.story.map((paragraph, index) => <p key={index}>{paragraph.text}</p>)}</div></div><div className="music-right"><ProjectVideo {...portfolio.music.project} /><div className="track-list">{portfolio.music.tracks.map((track, index) => <AudioPlayer key={track.id} track={track} index={index} />)}</div></div><MediaPlaceholder item={portfolio.music.studio} className="studio-placeholder" onOpen={setLightbox} /></div>
        </section>

        <section id="soccer" className="chapter-section soccer-section" aria-labelledby="soccer-title">
          <SectionIntro number="03" label="Soccer" />
          <MediaPlaceholder item={portfolio.soccer.primary} className="soccer-hero-media" onOpen={setLightbox} />
          <div className="soccer-story" data-reveal><div><h3>{portfolio.soccer.story}</h3></div><div className="soccer-media-stack"><p className="eyebrow">Career summary</p><p>{portfolio.soccer.summary}</p><ProjectVideo {...portfolio.soccer.goalVideo} className="soccer-goal-video" /><div className="soccer-media-divider" aria-hidden="true" /><MediaPlaceholder item={portfolio.soccer.gallery[0]} className="soccer-training-media" onOpen={setLightbox} /></div></div>
        </section>

        <section id="cooking" className="chapter-section cooking-section" aria-labelledby="cooking-title">
          <SectionIntro number="04" label="Cooking" />
          <div className="cooking-lead"><MediaPlaceholder item={portfolio.cooking.process} className="cooking-process-photo" onOpen={setLightbox} /><div className="cooking-brief" data-reveal><div className="cooking-story">{portfolio.cooking.storyTopics.map((topic) => <p key={topic}>{topic}</p>)}</div><div className="dish-grid">{portfolio.cooking.dishes.map((dish, index) => { const item = dish as typeof dish & { src?: string; alt?: string; position?: string }; return <article className={`dish-card ${index === 0 ? "dish-featured" : ""}`} key={dish.id} data-reveal><button type="button" className={`dish-photo dish-photo-${index + 1} ${item.src ? "has-media" : ""}`} onClick={() => setLightbox({ id: dish.id, label: `${dish.title} photo`, detail: item.src ? dish.note : "Cooking photo placeholder", tone: "warm", src: item.src, alt: item.alt, position: item.position })} aria-label={`Open ${dish.title} ${item.src ? "photo" : "photo placeholder"}`}>{item.src ? <img src={item.src} alt="" style={{ objectPosition: item.position }} /> : <span>Photo needed</span>}<Expand size={17} aria-hidden="true" /></button><div className="dish-copy"><span>0{index + 1}</span><div><h3>{dish.title}</h3><p>{dish.note}</p></div></div></article>; })}</div></div></div>
        </section>
      </div>

      <footer className="site-footer">
        <div className="footer-title"><span>JN</span><h2>Josh Nogen</h2></div>
        <div className="footer-links">{portfolio.footer.links.map((link) => <a key={link.label} href={link.href} target={link.href.startsWith("mailto:") ? undefined : "_blank"} rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}><span><small>{link.label}</small>{link.value}</span><ArrowDownRight size={15} /></a>)}</div>
        <div className="footer-bottom"><p>{portfolio.footer.recalc}</p><p>Private / No indexing</p><a href="#top">Back to top <ArrowRight size={14} /></a></div>
      </footer>

      {lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-labelledby="lightbox-title" onMouseDown={(event) => event.target === event.currentTarget && setLightbox(null)}><button ref={closeButtonRef} className="lightbox-close" type="button" onClick={() => setLightbox(null)} aria-label="Close media preview"><X size={20} /></button><button className="lightbox-nav lightbox-prev" type="button" disabled aria-label="Previous media"><ArrowLeft size={20} /></button><div className={`lightbox-media tone-${lightbox.tone || "neutral"} ${lightbox.src ? "has-image" : ""}`}>{lightbox.src ? <img src={lightbox.src} alt={lightbox.alt || lightbox.label} style={{ objectPosition: lightbox.position }} /> : <div className="media-cross" aria-hidden="true"><span /><span /></div>}<div className="lightbox-caption"><p className="eyebrow">{lightbox.src ? "Selected media" : "Media placeholder"}</p><h2 id="lightbox-title">{lightbox.label}</h2><p>{lightbox.detail}</p></div></div><button className="lightbox-nav lightbox-next" type="button" disabled aria-label="Next media"><ArrowRight size={20} /></button></div>}
    </main>
  );
}
