"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Bike from "./Bike";
import BookButton from "./BookButton";
import { btnPrimary } from "@/lib/styles";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const spin = useTransform(scrollY, (y) => y * 0.45);
  const bikeX = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden pt-28 pb-16 md:pt-40 md:pb-28">
      {/* soft volt glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-24 size-[28rem] rounded-full bg-volt/40 blur-3xl md:size-[40rem]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[1.1fr_1fr] md:items-center md:px-8">
        <motion.div style={{ y: textY, opacity: fade }}>
          <motion.p
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper/70 px-4 py-2 text-sm font-medium text-ink/70 backdrop-blur"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="size-2 rounded-full bg-volt-deep" />
            Now in 4 cities · 48 hubs
          </motion.p>

          <h1 className="font-display text-[3.25rem] leading-[0.95] font-bold tracking-[-0.035em] text-balance sm:text-7xl md:text-[5.5rem]">
            {["Ride the city.", "Skip the sweat."].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease }}
                >
                  {i === 1 ? (
                    <>
                      Skip the <span className="relative inline-block">
                        <span className="absolute inset-x-0 bottom-[0.08em] -z-10 h-[0.32em] rounded-full bg-volt" />
                        sweat.
                      </span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-6 max-w-md text-lg leading-relaxed text-muted"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
          >
            Rent a pedal-assist e-cycle by the hour, day or month. Pick it up from a hub near you,
            drop it at any other.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
          >
            <BookButton className={btnPrimary}>
              Rent from ₹39/hr
              <Arrow />
            </BookButton>
            <a
              href="#fleet"
              className="inline-flex h-14 items-center justify-center rounded-full border border-ink/15 px-7 text-base font-semibold transition-colors hover:bg-ink/5"
            >
              See the fleet
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.25, ease }}
        >
          <motion.div style={{ x: bikeX }}>
            <Bike spin={spin} className="w-full drop-shadow-[0_30px_30px_rgb(14_21_18/0.12)]" />
          </motion.div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              ["80 km", "range"],
              ["25 km/h", "assist"],
              ["0", "licence needed"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-2xl bg-sand/70 px-4 py-4">
                <div className="font-display text-xl font-bold tracking-tight md:text-2xl">{v}</div>
                <div className="mt-1 text-xs text-muted md:text-sm">{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Arrow() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path d="M4 10h12m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
