"use client";

import { useEffect, useState } from "react";
import { Reveal } from "../ui/Reveal";

/** The last word cycles through what an executive gets back when the operations are handed over, each in its own colour. */
const words = [
  { text: "time", color: "#2563eb" },
  { text: "focus", color: "#059669" },
  { text: "margin", color: "#7c3aed" },
  { text: "control", color: "#0891b2" },
  { text: "certainty", color: "#f97316" },
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
            Hand over the boring operations. Get back{" "}
            {/* Screen readers get the plain sentence; the cycling word is decorative. */}
            <span className="sr-only">time, focus, margin and control.</span>
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
