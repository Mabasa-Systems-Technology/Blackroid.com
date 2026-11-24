"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Plus } from "lucide-react";
import type { Service } from "@/lib/services";
import { cn } from "@/lib/cn";

const primaryButton =
  "inline-flex h-12 items-center rounded-[3px] bg-accent px-6 text-[0.9375rem] font-medium text-white transition-colors hover:bg-accent-deep";

function RowActions({ s, isOpen, primary }: { s: Service; isOpen: boolean; primary: string }) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
      <Link
        href={`/contact?service=${encodeURIComponent(s.title)}`}
        tabIndex={isOpen ? 0 : -1}
        className={primaryButton}
      >
        {primary}
      </Link>
      <Link
        href={`/services/${s.slug}`}
        tabIndex={isOpen ? 0 : -1}
        className="group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-accent"
      >
        Learn more
        <ArrowUpRight
          aria-hidden="true"
          strokeWidth={1.75}
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </Link>
    </div>
  );
}

/** One open row at a time: titles to scan, and for whichever is open an image and what we do. */
export function ServicesList({ items }: { items: Service[] }) {
  const [open, setOpen] = useState(0);

  return (
    <ul className="border-t border-ink">
      {items.map((s, i) => {
        const isOpen = open === i;
        const rich = !!(s.offerings && s.gallery);
        return (
          <li key={s.slug} className="border-b border-line-strong">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`service-${s.slug}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center gap-5 py-6 text-left lg:gap-10 lg:py-9"
              >
                <span className="w-7 shrink-0 font-mono text-xs text-muted lg:w-10">{s.number}</span>
                <span
                  className={cn(
                    "flex-1 text-title font-light text-balance transition-colors duration-300",
                    isOpen ? "text-ink" : "text-ink-soft",
                  )}
                >
                  {s.title}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,color,border-color] duration-500 ease-out-expo",
                    isOpen ? "rotate-45 border-ink bg-ink text-white" : "border-line-strong text-ink",
                  )}
                >
                  <Plus strokeWidth={1.5} className="size-5" />
                </span>
              </button>
            </h3>

            <div
              id={`service-${s.slug}`}
              role="region"
              aria-label={s.title}
              className={cn(
                "grid transition-[grid-template-rows] duration-500 ease-out-expo",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                {rich && s.gallery && s.offerings ? (
                  /* A fuller pitch: two photographs, a one-line promise, and what we do, one line each. */
                  <div className="grid gap-10 pb-12 lg:grid-cols-12 lg:gap-14 lg:pb-16 lg:pl-20">
                    <div className="relative pb-14 sm:pb-20 lg:col-span-6">
                      <div className="relative ml-auto aspect-[3/2] w-[88%] overflow-hidden rounded-[4px] rounded-tr-[48px] bg-navy-900">
                        <Image
                          src={s.gallery[0]}
                          alt={isOpen ? (s.galleryAlt ?? s.imageAlt) : ""}
                          fill
                          sizes="(min-width: 1024px) 40vw, 90vw"
                          className="object-cover"
                        />
                      </div>
                      <div
                        className={cn(
                          "absolute bottom-0 left-0 overflow-hidden rounded-[4px] border-[6px] border-white bg-navy-900 sm:border-8",
                          s.galleryPortrait ? "aspect-[2/3] w-[34%]" : "aspect-[3/2] w-[50%]",
                        )}
                      >
                        <Image
                          src={s.gallery[1]}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 22vw, 45vw"
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="lg:col-span-6">
                      {s.pitch && (
                        <p className="text-2xl leading-snug font-light text-balance text-ink lg:text-3xl">{s.pitch}</p>
                      )}
                      <ul className="mt-8 space-y-5">
                        {s.offerings.map((o) => (
                          <li key={o.title} className="flex items-start gap-4">
                            <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                              <Check aria-hidden="true" strokeWidth={2.25} className="size-4" />
                            </span>
                            <p className="leading-snug text-ink-soft">
                              <span className="block text-lg font-medium text-ink">{o.title}</span>
                              {o.text}
                            </p>
                          </li>
                        ))}
                      </ul>
                      <RowActions s={s} isOpen={isOpen} primary={`Discuss ${s.title.toLowerCase()}`} />
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-8 pb-10 lg:grid-cols-12 lg:gap-12 lg:pb-14 lg:pl-20">
                    <div
                      className={cn(
                        "relative aspect-[16/10] overflow-hidden bg-navy-900 lg:col-span-6",
                        i % 2 === 0 ? "rounded-[4px] rounded-tr-[48px]" : "rounded-[4px] rounded-tl-[48px]",
                      )}
                    >
                      <Image
                        src={s.image}
                        alt={isOpen ? s.imageAlt : ""}
                        fill
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center lg:col-span-5 lg:col-start-8">
                      <ul className="flex flex-wrap gap-2">
                        {s.capabilities.map((c) => (
                          <li
                            key={c}
                            className="rounded-full border border-line-strong bg-white px-4 py-2 text-sm text-ink-soft"
                          >
                            {c}
                          </li>
                        ))}
                      </ul>
                      <RowActions s={s} isOpen={isOpen} primary="Contact us" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
