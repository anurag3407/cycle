"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useBooking } from "./Providers";

/** Thumb-reach booking bar that appears on phones once the hero CTA has scrolled away. */
export default function MobileBookBar() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const { openBooking } = useBooking();

  useMotionValueEvent(scrollY, "change", (y) => {
    const nearBottom = y + window.innerHeight > document.documentElement.scrollHeight - 160;
    setVisible(y > window.innerHeight * 0.75 && !nearBottom);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-30 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
          initial={{ y: "120%" }}
          animate={{ y: 0 }}
          exit={{ y: "120%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
        >
          <div className="flex items-center justify-between gap-3 rounded-full bg-ink py-2 pr-2 pl-6 text-paper shadow-[0_12px_40px_rgb(14_21_18/0.35)]">
            <div className="leading-tight">
              <p className="text-xs text-paper/60">E-cycles from</p>
              <p className="font-display text-lg font-bold">₹39/hr</p>
            </div>
            <button
              type="button"
              onClick={() => openBooking()}
              className="h-12 rounded-full bg-volt px-6 text-sm font-semibold text-ink active:scale-95"
            >
              Book now
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
