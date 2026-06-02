import { useCallback, useMemo, useRef, useState } from "react";
import GooglyLogo from "./components/GooglyLogo";

const TAGLINES = [
  "The goofier way to search.",
  "We have results. Probably.",
  "Like that other one, but sillier.",
  "Search responsibly. Or don't.",
  "Now with 100% more googly eyes.",
  "I'm not saying we're better. I'm saying we're goofier.",
  "Powered by vibes and a little JavaScript.",
];

const PLACEHOLDERS = [
  "Search Goofle or type a silly thought…",
  "Ask me anything (results not guaranteed)…",
  "What are you looking for, friend?…",
  "Type here. Press enter. See what happens…",
  "How do I stop procrastinating? (later)…",
];

const GOOFY_QUERIES = [
  "do a barrel roll",
  "google gravity",
  "askew",
  "the answer to life the universe and everything",
  "zerg rush",
  "what is the loneliest number",
  "how many licks to the center of a tootsie pop",
  "is a hotdog a sandwich",
];

const CONFETTI_EMOJI = ["🎉", "👀", "🤪", "🥳", "✨", "🪿", "🤡", "🌀", "💫", "🍩"];

type Confetti = {
  id: number;
  emoji: string;
  left: number;
  delay: number;
  duration: number;
  drift: number;
  rotate: number;
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function googleSearch(query: string) {
  window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
    query,
  )}`;
}

export default function App() {
  const [query, setQuery] = useState("");
  const [tagline, setTagline] = useState(() => pick(TAGLINES));
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [wobbling, setWobbling] = useState(false);
  const placeholder = useMemo(() => pick(PLACEHOLDERS), []);
  const confettiId = useRef(0);
  const wobbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const burstConfetti = useCallback(() => {
    const pieces: Confetti[] = Array.from({ length: 28 }, () => ({
      id: confettiId.current++,
      emoji: pick(CONFETTI_EMOJI),
      left: Math.random() * 100,
      delay: Math.random() * 0.25,
      duration: 1.6 + Math.random() * 1.4,
      drift: (Math.random() - 0.5) * 240,
      rotate: (Math.random() - 0.5) * 720,
    }));
    setConfetti((prev) => [...prev, ...pieces]);

    const ids = new Set(pieces.map((p) => p.id));
    window.setTimeout(() => {
      setConfetti((prev) => prev.filter((p) => !ids.has(p.id)));
    }, 3200);
  }, []);

  const doWobble = useCallback(() => {
    setWobbling(true);
    if (wobbleTimer.current) clearTimeout(wobbleTimer.current);
    wobbleTimer.current = setTimeout(() => setWobbling(false), 900);
  }, []);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = query.trim();
      if (!trimmed) {
        // No query? Have a little fun instead of doing nothing.
        setTagline("You have to type something first, goofball. 🪿");
        doWobble();
        return;
      }
      googleSearch(trimmed);
    },
    [query, doWobble],
  );

  const handleFeelingGoofy = useCallback(() => {
    burstConfetti();
    doWobble();
    setTagline(pick(TAGLINES));

    const trimmed = query.trim();
    if (trimmed) {
      // If you typed something, we'll still send you off… eventually.
      window.setTimeout(() => googleSearch(trimmed), 900);
    } else {
      // Otherwise, surprise the user with a classic goofy search.
      window.setTimeout(() => googleSearch(pick(GOOFY_QUERIES)), 1100);
    }
  }, [query, burstConfetti, doWobble]);

  return (
    <div className="page">
      {/* Decorative floating blobs for atmosphere */}
      <div className="blobs" aria-hidden="true">
        <span className="blob blob--blue" />
        <span className="blob blob--red" />
        <span className="blob blob--yellow" />
        <span className="blob blob--green" />
      </div>

      <header className="topbar">
        <nav className="topnav">
          <a href="https://mail.google.com" className="topnav-link">
            Goomail
          </a>
          <a href="https://images.google.com" className="topnav-link">
            Goomages
          </a>
          <button
            type="button"
            className="topnav-grid"
            aria-label="Goofle apps (they don't exist)"
            onClick={doWobble}
          >
            <span /><span /><span />
            <span /><span /><span />
            <span /><span /><span />
          </button>
          <button type="button" className="signin" onClick={burstConfetti}>
            Sign in… or don't
          </button>
        </nav>
      </header>

      <main className="hero">
        <div className="stage stagger">
          <GooglyLogo wobbling={wobbling} />

          <p className="tagline" aria-live="polite">
            {tagline}
          </p>

          <form className="search" onSubmit={handleSearch} role="search">
            <div className="search-box">
              <svg
                className="search-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z"
                />
              </svg>
              <input
                className="search-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                aria-label="Search Goofle"
                autoComplete="off"
                autoFocus
              />
              {query && (
                <button
                  type="button"
                  className="search-clear"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                >
                  ×
                </button>
              )}
            </div>

            <div className="buttons">
              <button type="submit" className="btn">
                Goofle Search
              </button>
              <button
                type="button"
                className="btn btn--goofy"
                onClick={handleFeelingGoofy}
              >
                I'm Feeling Goofy
              </button>
            </div>
          </form>

          <p className="languages">
            Goofle offered in:{" "}
            <a href="#" onClick={(e) => e.preventDefault()}>
              Gibberish
            </a>{" "}
            <a href="#" onClick={(e) => e.preventDefault()}>
              Pig Latin
            </a>{" "}
            <a href="#" onClick={(e) => e.preventDefault()}>
              Goose
            </a>{" "}
            <a href="#" onClick={(e) => e.preventDefault()}>
              Emoji
            </a>
          </p>
        </div>
      </main>

      <footer className="footer">
        {/* <div className="footer-top">🌍 A goofier way to search the whole net</div> */}
        <div className="footer-bottom">
          <div className="footer-links">
            <a href="#" onClick={(e) => e.preventDefault()}>
              About
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Advertising
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Business
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              How Search (sort of) Works
            </a>
          </div>
          <div className="footer-links">
            <a href="#" onClick={(e) => e.preventDefault()}>
              Privacy (we forget everything)
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Terms
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Settings
            </a>
          </div>
        </div>
      </footer>

      {/* Confetti layer */}
      <div className="confetti-layer" aria-hidden="true">
        {confetti.map((c) => (
          <span
            key={c.id}
            className="confetti"
            style={{
              left: `${c.left}%`,
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.duration}s`,
              ["--drift" as string]: `${c.drift}px`,
              ["--spin" as string]: `${c.rotate}deg`,
            }}
          >
            {c.emoji}
          </span>
        ))}
      </div>
    </div>
  );
}
