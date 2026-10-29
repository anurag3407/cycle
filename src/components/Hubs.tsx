"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cities } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function Hubs() {
  const [active, setActive] = useState(cities[0].name);
  const city = cities.find((c) => c.name === active)!;

  return (
    <section id="hubs" className="bg-sand/60 py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Pickup hubs"
          title="Never more than a short walk away."
          body="Pick up from one hub, drop off at any other in the same city."
        />

        <div
          role="tablist"
          aria-label="Cities"
          className="no-scrollbar -mx-5 mt-12 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0"
        >
          {cities.map((c) => (
            <button
              key={c.name}
              role="tab"
              aria-selected={c.name === active}
              onClick={() => setActive(c.name)}
              className={`h-11 shrink-0 rounded-full px-5 text-sm font-semibold transition-colors ${
                c.name === active ? "bg-ink text-paper" : "bg-paper text-ink/70 hover:text-ink"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div role="tabpanel" className="mt-8 min-h-[16rem]">
          <AnimatePresence mode="wait">
            <motion.ul
              key={city.name}
              className="grid gap-3 md:grid-cols-3 md:gap-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {city.hubs.map((h) => (
                <li key={h.name} className="flex items-center gap-4 rounded-3xl bg-paper p-5 md:flex-col md:items-start md:p-7">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-volt">
                    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
                      <circle cx="12" cy="9.5" r="2.5" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold tracking-tight md:text-xl">{h.name}</p>
                    <p className="text-sm text-muted">{h.area}</p>
                    <p className="mt-1 text-sm font-medium text-ink/80">Open {h.hours}</p>
                  </div>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
