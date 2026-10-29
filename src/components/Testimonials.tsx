import { testimonials } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Testimonials() {
  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading eyebrow="Riders" title="Loved on the daily commute." />
      </div>

      <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 md:mx-auto md:mt-20 md:grid md:max-w-6xl md:grid-cols-3 md:gap-6 md:px-8">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08} className="w-[84%] shrink-0 snap-start sm:w-[60%] md:w-auto">
            <figure className="flex h-full flex-col justify-between rounded-[2rem] border border-ink/10 p-7 md:p-8">
              <blockquote className="font-display text-xl leading-snug font-medium tracking-tight md:text-2xl">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full bg-ink font-display font-semibold text-volt">
                  {t.name[0]}
                </span>
                <span>
                  <span className="block font-semibold">{t.name}</span>
                  <span className="block text-sm text-muted">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
        <div aria-hidden className="w-1 shrink-0 md:hidden" />
      </div>
    </section>
  );
}
