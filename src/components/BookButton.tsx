"use client";

import type { PlanId } from "@/lib/data";
import { useBooking } from "./Providers";

type BookButtonProps = {
  bikeId?: string;
  plan?: PlanId;
  className?: string;
  children: React.ReactNode;
};

export default function BookButton({ bikeId, plan, className, children }: BookButtonProps) {
  const { openBooking } = useBooking();
  return (
    <button type="button" onClick={() => openBooking({ bikeId, plan })} className={className}>
      {children}
    </button>
  );
}

