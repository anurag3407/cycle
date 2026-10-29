"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { steps } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function HowItWorks() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="how" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-36">
      <SectionHeading eyebrow="How it works" title="Three steps to the open road." />

      <ol ref={listRef} className="relative mt-16 grid gap-14 md:mt-20 md:grid-cols-3 md:gap-10">
        {/* vertical progress rail on mobile, horizontal on desktop */}
        <div aria-hidden className="absolute top-2 bottom-2 left-[1.6rem] w-px bg-ink/10 md:hidden">
          <motion.div style={{ scaleY: progress }} className="h-full w-full origin-top bg-ink" />
        </div>
        <div aria-hidden className="absolute top-[1.6rem] right-0 left-0 hidden h-px bg-ink/10 md:block">
          <motion.div style={{ scaleX: progress }} className="h-full w-full origin-left bg-ink" />
        </div>

        {steps.map((s, i) => (
          <li key={s.title} className="relative pl-20 md:pl-0">
            <Reveal delay={i * 0.08}>
              <span className="absolute top-0 left-0 grid size-13 place-items-center rounded-full bg-volt font-display text-lg font-bold ring-8 ring-paper md:relative">
                {i + 1}
              </span>
              <h3 className="font-display text-2xl font-semibold tracking-tight md:mt-8 md:text-3xl">
                {s.title}
              </h3>
              <p className="mt-3 max-w-sm leading-relaxed text-muted">{s.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
