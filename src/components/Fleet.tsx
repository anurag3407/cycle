import { bikes, inr } from "@/lib/data";
import Bike from "./Bike";
import BookButton from "./BookButton";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Fleet() {
  return (
    <section id="fleet" className="bg-ink py-24 text-paper md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          dark
          eyebrow="The fleet"
          title="One for every kind of ride."
          body="Every e-cycle is serviced after each rental, fully charged and ready the moment you arrive."
        />
      </div>

      {/* Swipe rail on mobile, grid from md up */}
      <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 md:mx-auto md:mt-20 md:grid md:max-w-6xl md:grid-cols-3 md:gap-6 md:overflow-visible md:px-8">
        {bikes.map((b, i) => (
          <Reveal key={b.id} delay={i * 0.08} className="w-[84%] shrink-0 snap-start sm:w-[60%] md:w-auto">
            <article className="flex h-full flex-col rounded-[2rem] bg-moss p-6 md:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-3xl font-bold tracking-tight">{b.name}</h3>
                  <p className="mt-1 text-sm text-paper/60">{b.tagline}</p>
                </div>
                <span className="rounded-full bg-paper/10 px-3 py-1 text-xs font-medium">{b.extra}</span>
              </div>

              <div className="my-6 rounded-3xl bg-paper px-4 py-6">
                <Bike frame={b.frame} variant={b.variant} className="w-full" />
              </div>

              <dl className="mb-6 grid grid-cols-2 gap-4 border-t border-paper/10 pt-5 text-sm">
                <div>
                  <dt className="text-paper/55">Range</dt>
                  <dd className="mt-1 font-display text-2xl font-semibold">{b.range} km</dd>
                </div>
                <div>
                  <dt className="text-paper/55">From</dt>
                  <dd className="mt-1 font-display text-2xl font-semibold">
                    {inr(b.rates.hour)}
                    <span className="text-base font-normal text-paper/55">/hr</span>
                  </dd>
                </div>
              </dl>

              <BookButton
                bikeId={b.id}
                className="mt-auto h-12 w-full rounded-full bg-volt text-sm font-semibold text-ink transition-transform active:scale-[0.97]"
              >
                Book {b.name}
              </BookButton>
            </article>
          </Reveal>
        ))}
        {/* trailing spacer so the last card can snap with a gutter */}
        <div aria-hidden className="w-1 shrink-0 md:hidden" />
      </div>
      <p className="mt-6 px-5 text-center text-sm text-paper/45 md:hidden">Swipe to see more →</p>
    </section>
  );
}
