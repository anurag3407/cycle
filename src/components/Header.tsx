"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { navLinks } from "@/lib/data";
import { useBooking } from "./Providers";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`flex items-center gap-2 font-display text-xl font-bold tracking-tight ${className}`}>
      <span className="grid size-8 place-items-center rounded-full bg-volt text-ink">
        <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
          <path d="M13.5 2 5 13.5h6L9.5 22 19 9.5h-6.2z" />
        </svg>
      </span>
      E‑Cyclone
    </a>
  );
}

export default function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openBooking } = useBooking();
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Scrolling is locked while the menu is open; close it first so the cleanup below unlocks it.
  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => lenis?.scrollTo(href, { offset: -72 }), 0);
  };

  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    lenis?.stop();
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = "";
      lenis?.start();
    };
  }, [menuOpen, lenis]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          scrolled || menuOpen
            ? "bg-paper/80 shadow-[0_1px_0_rgb(14_21_18/0.06)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
          <Logo />

          <nav className="hidden items-center gap-8 text-sm font-medium text-ink/70 md:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-ink">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openBooking()}
              className="h-10 rounded-full bg-ink px-5 text-sm font-semibold text-paper transition-transform active:scale-95"
            >
              Book a ride
            </button>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              className="grid size-10 place-items-center rounded-full border border-ink/10 md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 h-0.5 w-4 rounded bg-ink transition-transform duration-300 ${
                    menuOpen ? "top-1.25 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-4 rounded bg-ink transition-transform duration-300 ${
                    menuOpen ? "top-1.25 -rotate-45" : "top-2.5"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-paper px-5 pt-24 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => goTo(e, l.href)}
                  className="border-b border-ink/10 py-5 font-display text-4xl font-semibold tracking-tight"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
