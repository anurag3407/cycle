"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { stats } from "@/lib/data";
import Reveal from "./Reveal";

function Counter({ value, decimals = 0, suffix }: { value: number; decimals?: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const format = (n: number) =>
    n.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) {
      ref.current.textContent = format(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (n) => {
        if (ref.current) ref.current.textContent = format(n);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  return <span ref={ref}>{format(0)}</span>;
}

export default function Impact() {
  return (
    <section className="px-3 md:px-6">
      <div className="mx-auto max-w-[90rem] rounded-[2.5rem] bg-volt px-5 py-20 md:px-14 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="max-w-3xl font-display text-[2rem] leading-[1.08] font-semibold tracking-[-0.025em] text-balance md:text-6xl">
              Every ride is a car trip that didn&apos;t happen. Here&apos;s what our riders have added up to.
            </p>
          </Reveal>

          <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-24 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="flex flex-col-reverse border-t border-ink/20 pt-5">
                <dt className="mt-2 text-sm text-ink/65 md:text-base">{s.label}</dt>
                <dd className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                  <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
