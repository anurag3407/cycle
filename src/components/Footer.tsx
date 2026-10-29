import { navLinks } from "@/lib/data";
import { btnPrimary } from "@/lib/styles";
import BookButton from "./BookButton";
import { Arrow } from "./Hero";
import { Logo } from "./Header";
import Reveal from "./Reveal";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5 pt-24 pb-32 md:px-8 md:pt-36 md:pb-16">
        <Reveal>
          <h2 className="max-w-3xl font-display text-5xl leading-[0.98] font-bold tracking-[-0.035em] text-balance md:text-8xl">
            Your next ride is <span className="text-volt">ten minutes</span> away.
          </h2>
          <BookButton className={`${btnPrimary} mt-10 w-full sm:w-auto`}>
            Book a ride
            <Arrow />
          </BookButton>
        </Reveal>

        <div className="mt-24 grid gap-10 border-t border-paper/10 pt-10 md:mt-32 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/55">
              Electric cycle rentals for people who&apos;d rather glide than honk.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-3 text-sm text-paper/70 md:grid-cols-1">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-paper">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="space-y-3 text-sm text-paper/70">
            <a href="mailto:hello@e-cyclone.example" className="block hover:text-paper">
              hello@e-cyclone.example
            </a>
            <a href="tel:+910000000000" className="block hover:text-paper">
              +91 00000 00000
            </a>
          </div>
        </div>

        <p className="mt-12 text-xs text-paper/40">© E‑Cyclone Mobility. All rights reserved.</p>
      </div>
    </footer>
  );
}
