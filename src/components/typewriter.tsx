import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  words: string[];
  typingSpeed?: number; // ms per keystroke while typing
  deletingSpeed?: number; // ms per keystroke while deleting
  holdTime?: number; // ms to hold the full word before deleting
  className?: string;
}

/**
 * Rotating typewriter text. Types out a word, holds it, deletes it,
 * then types the next word — looping forever. Honors prefers-reduced-motion
 * by rendering the first word statically with no animation.
 */
export function Typewriter({
  words,
  typingSpeed = 75,
  deletingSpeed = 40,
  holdTime = 1600,
  className,
}: TypewriterProps) {
  const [index, setIndex] = useState(0); // which word
  const [sub, setSub] = useState(0); // chars shown
  const [deleting, setDeleting] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) return;

    const word = words[index % words.length] ?? "";

    let timeout: number;

    if (!deleting && sub === word.length) {
      // hold full word
      timeout = window.setTimeout(() => setDeleting(true), holdTime);
    } else if (deleting && sub === 0) {
      // finished deleting -> move to next word
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      timeout = window.setTimeout(() => {}, typingSpeed);
    } else {
      // type or delete one char
      const speed = deleting ? deletingSpeed : typingSpeed;
      timeout = window.setTimeout(() => {
        setSub((s) => (deleting ? s - 1 : s + 1));
      }, speed);
    }

    return () => window.clearTimeout(timeout);
  }, [sub, deleting, index, words, typingSpeed, deletingSpeed, holdTime]);

  if (reduced.current) {
    return <span className={className}>{words[0]}</span>;
  }

  const current = words[index % words.length] ?? words[0] ?? "";
  return (
    <span className={className} aria-label={current}>
      {current.slice(0, sub)}
      <span className="typewriter-caret" aria-hidden="true" />
    </span>
  );
}
