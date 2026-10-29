const items = [
  "No licence needed",
  "Helmet included",
  "Free battery swaps",
  "Return at any hub",
  "24/7 roadside help",
  "Zero emissions",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden bg-ink py-5 text-paper" aria-label={items.join(", ")}>
      <div className="flex w-max animate-marquee" aria-hidden>
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-6 pr-6 font-display text-lg font-medium whitespace-nowrap md:text-xl">
            {t}
            <span className="text-volt">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
