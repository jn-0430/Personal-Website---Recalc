import type { Metadata } from "next";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = { title: "Private access — Josh Nogen" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ next?: string }>;
}) {
  const next = (await searchParams)?.next;

  return (
    <main className="access-page">
      <div className="access-orbit" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <section className="access-panel" aria-labelledby="access-title">
        <div className="access-kicker"><span>JN</span><span>Restricted / 2026</span></div>
        <div>
          <p className="eyebrow">Private portfolio</p>
          <h1 id="access-title">Josh<br />Nogen</h1>
        </div>
          <LoginForm nextPath={next} />
        <p className="access-note">This site contains personal portfolio material intended for invited reviewers.</p>
      </section>
    </main>
  );
}
