"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { testimonials } from "@/lib/clients";
import { cn } from "@/lib/cn";
import { Reveal } from "../ui/Reveal";

const SLIDE_MS = 7000;
const ease = [0.16, 1, 0.3, 1] as const;

/**
 * One client at a time: the logo, what they say, and who said it. It moves on by itself
 * (and pauses when the pointer is over it); the arrows and dots let a visitor choose.
 */
export function Clients() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const count = testimonials.length;
  const autoplay = !paused && !reduceMotion && count > 1;

  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % count), SLIDE_MS);
    return () => clearTimeout(t);
  }, [active, autoplay, count]);

  if (count === 0) return null;
  const t = testimonials[active];
  const go = (n: number) => setActive((n + count) % count);

  return (
    <section aria-labelledby="clients-heading" className="bg-paper py-24 lg:py-36">
      <div className="container-site" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
        <Reveal>
          <h2 id="clients-heading" className="text-center text-headline font-light text-balance">
            Businesses we&apos;ve worked with.
          </h2>
        </Reveal>

        <div className="mx-auto mt-14 max-w-3xl text-center lg:mt-20" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease }}
              className="flex min-h-[21rem] flex-col items-center lg:min-h-[22rem]"
            >
              <div className="flex h-12 items-center">
                {t.logo ? (
                  <Image
                    src={t.logo.src}
                    alt={t.name}
                    width={t.logo.width}
                    height={t.logo.height}
                    priority={active === 0}
                    className={cn("w-auto max-w-[12rem] object-contain", t.logo.heightClass)}
                  />
                ) : (
                  <span className="text-lg font-medium tracking-tight text-ink">{t.name}</span>
                )}
              </div>

              <blockquote className="mt-10 flex-1 text-2xl leading-snug font-light text-balance text-ink lg:text-4xl">
                {t.feedback.quote}
              </blockquote>

              <figcaption className="mt-10 flex items-center gap-4 text-left">
                <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-muted">
                  {t.feedback.photo ? (
                    <Image src={t.feedback.photo} alt="" fill sizes="48px" className="object-cover" />
                  ) : (
                    <User aria-hidden="true" strokeWidth={1.5} className="size-5" />
                  )}
                </div>
                <p className="text-sm text-muted">
                  <span className="block text-base font-medium text-ink">{t.feedback.person}</span>
                  {t.feedback.role}
                </p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {count > 1 && (
          <div className="mt-12 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Previous client"
              className="flex size-11 items-center justify-center rounded-full border border-line-strong bg-white text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
            >
              <ChevronLeft aria-hidden="true" strokeWidth={1.5} className="size-5" />
            </button>

            <div className="flex items-center gap-2" role="group" aria-label="Choose a client">
              {testimonials.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={c.name}
                  aria-pressed={i === active}
                  className="group flex h-6 items-center"
                >
                  <span
                    className={cn(
                      "block h-1.5 overflow-hidden rounded-full transition-all duration-500",
                      i === active ? "w-10 bg-line-strong" : "w-1.5 bg-line-strong group-hover:bg-muted",
                    )}
                  >
                    {/* The current dot fills over the time this client stays on screen. */}
                    {i === active && (
                      <span
                        key={`${active}-${autoplay}`}
                        className="block h-full w-full origin-left bg-ink"
                        style={autoplay ? { animation: `bar-fill ${SLIDE_MS}ms linear forwards` } : undefined}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Next client"
              className="flex size-11 items-center justify-center rounded-full border border-line-strong bg-white text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
            >
              <ChevronRight aria-hidden="true" strokeWidth={1.5} className="size-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
