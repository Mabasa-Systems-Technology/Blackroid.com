"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { ButtonLink } from "../ui/Button";
import { HeroBackground } from "../HeroBackground";

const headline = ["We solve what slows", "your business down."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Parallax only on the background, so content is never pushed out of the clipped section.
  const fieldY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fieldOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] overflow-hidden bg-navy-950 text-white">
      <motion.div
        aria-hidden="true"
        style={{ opacity: fieldOpacity, y: fieldY }}
        className="absolute inset-0 -z-10 bg-navy-950"
      >
        <HeroBackground />
      </motion.div>

      <div className="container-site flex flex-1 flex-col justify-end pt-36 pb-12 lg:pb-16">
        <h1 className="max-w-6xl text-display font-light">
          {headline.map((line, i) => (
            <span key={line} className="-mb-[0.06em] block overflow-hidden pb-[0.14em]">
              <span className="line-up block" style={{ "--d": `${0.2 + i * 0.1}s` } as CSSProperties}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="rise mt-10 lg:mt-12" style={{ "--d": "0.5s" } as CSSProperties}>
          <ButtonLink
            href="/contact"
            variant="light"
            className="h-14 px-8 text-base shadow-xl shadow-black/25 ring-4 ring-white/15 hover:ring-white/30 sm:h-16 sm:px-10 sm:text-lg"
          >
            Discuss Your Business Challenge
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
