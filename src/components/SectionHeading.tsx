import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  body?: string;
  dark?: boolean;
};

export default function SectionHeading({ eyebrow, title, body, dark }: SectionHeadingProps) {
  return (
    <Reveal className="max-w-2xl">
      <p className={`text-sm font-semibold tracking-[0.14em] uppercase ${dark ? "text-volt" : "text-muted"}`}>
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-4xl leading-[1.02] font-bold tracking-[-0.03em] text-balance md:text-6xl">
        {title}
      </h2>
      {body && (
        <p className={`mt-5 max-w-lg text-lg leading-relaxed ${dark ? "text-paper/65" : "text-muted"}`}>{body}</p>
      )}
    </Reveal>
  );
}
