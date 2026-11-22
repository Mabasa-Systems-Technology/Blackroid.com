"use client";

import { useEffect, useState } from "react";
import { Reveal } from "../ui/Reveal";

/** The last word of the line cycles through what we do with complex operations, each in its own colour. */
const words = [
  { text: "handled", color: "#2563eb" },
  { text: "completed", color: "#059669" },
  { text: "managed", color: "#7c3aed" },
  { text: "measured", color: "#0891b2" },
  { text: "improved", color: "#f97316" },
];

export function Intro() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setI((n) => (n + 1) % words.length), 2200);
    return () => clearTimeout(timer);
  }, [i]);

  const word = words[i];

  return (
    <section className="bg-white py-28 lg:py-44">
      <div className="container-site">
        <Reveal>
          <p className="mx-auto max-w-4xl text-center text-headline font-light text-balance text-ink">
            Your complex operations, {/* Screen readers get the plain sentence; the cycling word is decorative. */}
            <span className="sr-only">handled.</span>
            <span aria-hidden="true">
              <span key={word.text} className="word-swap font-normal" style={{ color: word.color }}>
                {word.text}
              </span>
              .
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
