"use client";

import { useState } from "react";
import { faqs } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-[1fr_1.4fr] md:gap-20 md:px-8 md:py-36">
      <SectionHeading eyebrow="FAQ" title="Questions, answered." />

      <ul className="border-t border-ink/10">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <li key={f.q} className="border-b border-ink/10">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-lg font-semibold tracking-tight md:text-xl"
              >
                {f.q}
                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-full border border-ink/15 transition-[transform,background-color] duration-300 ${
                    isOpen ? "rotate-45 bg-ink text-paper" : ""
                  }`}
                  aria-hidden
                >
                  <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M8 3v10M3 8h10" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              <div
                id={`faq-${i}`}
                className={`grid transition-[grid-template-rows] duration-500 ease-out-soft ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-xl pr-12 pb-6 leading-relaxed text-muted">{f.a}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
