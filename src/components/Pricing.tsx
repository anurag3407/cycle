import { bikes, inr, plans } from "@/lib/data";
import { btnDark, btnPrimary } from "@/lib/styles";
import BookButton from "./BookButton";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const lowest = (id: (typeof plans)[number]["id"]) => Math.min(...bikes.map((b) => b.rates[id]));

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-36">
      <SectionHeading
        eyebrow="Pricing"
        title="Simple plans. No surprises."
        body="Prices include GST, insurance and a helmet. Pay only for the time you ride."
      />

      <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3 md:gap-6">
        {plans.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08}>
            <article
              className={`flex h-full flex-col rounded-[2rem] p-7 md:p-8 ${
                p.featured ? "bg-ink text-paper" : "bg-sand/70"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-semibold tracking-tight">{p.name}</h3>
                {p.featured && (
                  <span className="rounded-full bg-volt px-3 py-1 text-xs font-semibold text-ink">Most popular</span>
                )}
              </div>
              <p className={`mt-2 leading-relaxed ${p.featured ? "text-paper/65" : "text-muted"}`}>{p.blurb}</p>

              <p className="mt-8 flex items-baseline gap-1">
                <span className={`text-sm ${p.featured ? "text-paper/60" : "text-muted"}`}>from</span>
                <span className="font-display text-5xl font-bold tracking-tight">{inr(lowest(p.id))}</span>
                <span className={p.featured ? "text-paper/60" : "text-muted"}>/{p.unit}</span>
              </p>

              <ul className="mt-8 mb-10 space-y-3">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${
                        p.featured ? "bg-volt text-ink" : "bg-ink text-paper"
                      }`}
                    >
                      <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                        <path d="m2.5 6.2 2.2 2.2 4.8-4.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>

              <BookButton plan={p.id} className={`${p.featured ? btnPrimary : btnDark} mt-auto w-full`}>
                Choose {p.name.toLowerCase()}
              </BookButton>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
