import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import styles from "./page.module.css";

const options = [
  {
    number: "01",
    name: "Editorial split",
    className: styles.editorial,
    breakTitle: true,
    label: "Project",
    description: "I'm currently spending all my tokens making a compact API-informed dashboard following equities, rates, FX, and other macro trends.",
  },
  {
    number: "02",
    name: "Market terminal",
    className: styles.terminal,
    breakTitle: true,
    label: "Project / building now",
    ticker: ["EQ  +0.8%", "UST  4.21%", "EUR/USD  1.08"],
    description: "A compact API-informed dashboard for the market signals I follow throughout recruiting.",
  },
  {
    number: "03",
    name: "Research ledger",
    className: styles.ledger,
    label: "Project",
    description: "A personal research tool tracking equities, rates, FX, and broader macro trends through a small set of APIs.",
  },
  {
    number: "04",
    name: "Blue haze",
    className: styles.haze,
    breakTitle: true,
    label: "Project / building now",
    ticker: ["S&P  +0.8%", "UST  4.21%", "DXY  104.2"],
    description: "A compact API-informed dashboard for the market signals I follow throughout recruiting.",
  },
  {
    number: "05",
    name: "Blue spotlight",
    className: styles.spotlight,
    breakTitle: true,
    label: "Project / building now",
    ticker: ["EQ  +0.8%", "10Y  4.21%", "EUR/USD  1.08"],
    description: "A compact API-informed dashboard for the market signals I follow throughout recruiting.",
  },
  {
    number: "06",
    name: "After-hours glow",
    className: styles.afterHours,
    breakTitle: true,
    label: "Project / building now",
    ticker: ["NQ  +1.1%", "WTI  74.2", "JPY  151.4"],
    description: "A compact API-informed dashboard for the market signals I follow throughout recruiting.",
  },
];

export default function StyleOptionsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.back}>← Back to portfolio</Link>
        <p>Markets dashboard / callout options</p>
        <span>Preview only</span>
      </header>
      <section className={styles.intro}>
        <p>Six directions for the project callout below Selected Experience.</p>
        <h1>Choose a style.</h1>
      </section>
      <section className={styles.options} aria-label="Markets dashboard design options">
        {options.map((option) => (
          <article className={`${styles.option} ${option.className}`} key={option.number}>
            <header className={styles.optionLabel}><span>{option.number}</span><span>{option.name}</span></header>
            <div className={styles.card}>
              {option.className === styles.ledger && <span className={styles.ledgerIndex}>04</span>}
              <div className={styles.cardContent}>
                <p className={styles.eyebrow}>{option.label}</p>
                <h2>Markets<br className={option.breakTitle ? undefined : styles.ledgerBreak} /> dashboard</h2>
                {option.ticker && <div className={styles.ticker}>{option.ticker.map((item) => <span key={item}>{item}</span>)}</div>}
                <p className={styles.description}>{option.description}</p>
                <span className={styles.action}>Open dashboard <ArrowDownRight size={16} aria-hidden="true" /></span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
