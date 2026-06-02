import { useEffect, useRef } from "react";

/**
 * A single googly eye whose pupil chases the cursor. The pupil is moved via a
 * ref + direct style writes (not React state) so cursor tracking stays smooth
 * and never triggers re-renders.
 */
function GooglyEye({ wobbling }: { wobbling: boolean }) {
  const eyeRef = useRef<HTMLSpanElement>(null);
  const pupilRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const eye = eyeRef.current;
      const pupil = pupilRef.current;
      if (!eye || !pupil) return;

      const rect = eye.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx);

      // How far the pupil may roam inside the sclera.
      const radius = rect.width * 0.22;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      pupil.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <span
      ref={eyeRef}
      className={`googly-eye${wobbling ? " googly-eye--wobble" : ""}`}
      aria-hidden="true"
    >
      <span ref={pupilRef} className="googly-pupil" />
    </span>
  );
}

export default function GooglyLogo({ wobbling }: { wobbling: boolean }) {
  return (
    <h1 className="logo" aria-label="Goofle">
      <span className="logo-letter" style={{ color: "var(--g-blue)" }}>
        G
      </span>
      <GooglyEye wobbling={wobbling} />
      <GooglyEye wobbling={wobbling} />
      <span className="logo-letter" style={{ color: "var(--g-blue)" }}>
        f
      </span>
      <span className="logo-letter" style={{ color: "var(--g-green)" }}>
        l
      </span>
      <span className="logo-letter" style={{ color: "var(--g-red)" }}>
        e
      </span>
    </h1>
  );
}
