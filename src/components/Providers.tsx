"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import BookingSheet, { type BookingOptions } from "./BookingSheet";

type BookingContextValue = {
  openBooking: (options?: BookingOptions) => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside <Providers>");
  return ctx;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<BookingOptions>({});

  const openBooking = useCallback((opts: BookingOptions = {}) => {
    setOptions(opts);
    setOpen(true);
  }, []);
  const closeBooking = useCallback(() => setOpen(false), []);

  return (
    // Touch devices keep native scrolling; Lenis only smooths wheel/trackpad input.
    <ReactLenis root options={{ lerp: 0.09, anchors: { offset: -72 } }}>
      <MotionConfig reducedMotion="user">
        <BookingContext.Provider value={{ openBooking }}>
          {children}
          <BookingSheet
            open={open}
            initial={options}
            onClose={closeBooking}
          />
        </BookingContext.Provider>
      </MotionConfig>
    </ReactLenis>
  );
}
