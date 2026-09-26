"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";

export function LoginForm({ nextPath }: { nextPath?: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(result.error || "Access could not be verified.");
        return;
      }

      const destination = nextPath?.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/";
      router.replace(destination);
      router.refresh();
    } catch {
      setError("The server could not be reached. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="access-form" onSubmit={handleSubmit} aria-busy={loading}>
      <label htmlFor="portfolio-password">Password</label>
      <div className={`access-field ${error ? "has-error" : ""}`}>
        <LockKeyhole size={17} aria-hidden="true" />
        <input
          id="portfolio-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter access password"
          aria-describedby={error ? "password-error" : undefined}
          aria-invalid={Boolean(error)}
          required
          autoFocus
        />
        <button type="submit" disabled={loading} aria-label="Enter private portfolio">
          {loading ? <span className="button-loader" aria-label="Checking password" /> : <ArrowRight size={18} />}
        </button>
      </div>
      <p id="password-error" className="access-error" role="alert">{error}</p>
    </form>
  );
}
