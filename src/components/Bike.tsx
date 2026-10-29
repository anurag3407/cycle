"use client";

import { motion, type MotionValue } from "motion/react";

type BikeProps = {
  frame?: string;
  accent?: string;
  variant?: "city" | "cargo" | "sport";
  /** Wheel rotation in degrees. Pass a MotionValue to drive it from scroll. */
  spin?: MotionValue<number>;
  className?: string;
};

const SPOKES = [0, 30, 60, 90, 120, 150];

function Wheel({ cx, cy, spin }: { cx: number; cy: number; spin?: MotionValue<number> }) {
  return (
    <motion.g style={{ rotate: spin, transformBox: "fill-box", transformOrigin: "center" }}>
      <circle cx={cx} cy={cy} r={58} fill="none" stroke="#0e1512" strokeWidth={11} />
      <circle cx={cx} cy={cy} r={50} fill="none" stroke="#0e1512" strokeOpacity={0.35} strokeWidth={2} />
      {SPOKES.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const dx = Math.cos(rad) * 50;
        const dy = Math.sin(rad) * 50;
        return (
          <line
            key={deg}
            x1={cx - dx}
            y1={cy - dy}
            x2={cx + dx}
            y2={cy + dy}
            stroke="#0e1512"
            strokeOpacity={0.45}
            strokeWidth={1.6}
          />
        );
      })}
    </motion.g>
  );
}

export default function Bike({
  frame = "#18291f",
  accent = "#d2f65a",
  variant = "city",
  spin,
  className,
}: BikeProps) {
  const R = { x: 92, y: 168 };
  const F = { x: 312, y: 168 };
  const BB = { x: 188, y: 172 };
  const S = { x: 164, y: 92 };
  const H = { x: 276, y: 80 };
  const Hb = { x: 286, y: 112 };

  return (
    <svg viewBox="0 0 400 240" className={className} role="img" aria-label="Electric cycle">
      <Wheel cx={R.x} cy={R.y} spin={spin} />
      <Wheel cx={F.x} cy={F.y} spin={spin} />

      {variant === "city" && (
        <g stroke={frame} strokeWidth={5} strokeLinecap="round" fill="none">
          <path d={`M${S.x - 6} ${S.y + 4} L${R.x - 12} ${R.y - 62} L${R.x + 6} ${R.y - 62}`} />
          <line x1={R.x - 12} y1={R.y - 62} x2={R.x} y2={R.y} />
        </g>
      )}

      {variant === "cargo" && (
        <g>
          <line x1={Hb.x} y1={Hb.y} x2={Hb.x + 30} y2={Hb.y - 2} stroke={frame} strokeWidth={5} strokeLinecap="round" />
          <rect x={Hb.x + 2} y={Hb.y - 44} width={62} height={40} rx={6} fill={frame} />
          <path
            d={`M${Hb.x + 10} ${Hb.y - 32} h46 M${Hb.x + 10} ${Hb.y - 20} h46`}
            stroke="#f3f1ea"
            strokeOpacity={0.35}
            strokeWidth={2}
          />
        </g>
      )}

      {/* frame */}
      <g stroke={frame} strokeWidth={variant === "sport" ? 9 : 8} strokeLinecap="round" strokeLinejoin="round" fill="none">
        <polyline points={`${R.x},${R.y} ${BB.x},${BB.y} ${S.x},${S.y} ${R.x},${R.y}`} />
        <line x1={S.x} y1={S.y} x2={H.x} y2={variant === "sport" ? H.y + 2 : H.y + 14} />
        <line x1={BB.x} y1={BB.y} x2={Hb.x} y2={Hb.y} />
        <line x1={H.x} y1={H.y} x2={Hb.x} y2={Hb.y} />
        <line x1={Hb.x} y1={Hb.y} x2={F.x} y2={F.y} strokeWidth={6} />
        <line x1={S.x} y1={S.y} x2={S.x - 6} y2={S.y - 20} strokeWidth={6} />
        <line x1={H.x} y1={H.y} x2={H.x - 8} y2={H.y - 24} strokeWidth={6} />
      </g>

      {/* battery on the down tube */}
      <line x1={BB.x + 16} y1={BB.y - 13} x2={Hb.x - 16} y2={Hb.y + 12} stroke="#0e1512" strokeWidth={17} strokeLinecap="round" />
      <line x1={BB.x + 22} y1={BB.y - 17} x2={BB.x + 40} y2={BB.y - 28} stroke={accent} strokeWidth={5} strokeLinecap="round" />

      {/* saddle, bars, light */}
      <line x1={S.x - 26} y1={S.y - 24} x2={S.x + 12} y2={S.y - 24} stroke="#0e1512" strokeWidth={10} strokeLinecap="round" />
      <line x1={H.x - 22} y1={H.y - 26} x2={H.x + 10} y2={H.y - 30} stroke="#0e1512" strokeWidth={7} strokeLinecap="round" />
      <circle cx={Hb.x + 6} cy={H.y + 6} r={6} fill={accent} stroke="#0e1512" strokeWidth={2.5} />

      {/* hub motor + crank */}
      <circle cx={R.x} cy={R.y} r={13} fill={accent} stroke="#0e1512" strokeWidth={3} />
      <circle cx={F.x} cy={F.y} r={5} fill="#0e1512" />
      <circle cx={BB.x} cy={BB.y} r={12} fill="none" stroke="#0e1512" strokeWidth={4} />
      <line x1={BB.x} y1={BB.y} x2={BB.x + 10} y2={BB.y + 24} stroke="#0e1512" strokeWidth={5} strokeLinecap="round" />
    </svg>
  );
}
