"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { bikes, cities, inr, plans, type PlanId } from "@/lib/data";
import { btnPrimary } from "@/lib/styles";
import Bike from "./Bike";

export type BookingOptions = { bikeId?: string; plan?: PlanId };

type BookingSheetProps = {
  open: boolean;
  initial: BookingOptions;
  onClose: () => void;
};

const MAX_QTY: Record<PlanId, number> = { hour: 12, day: 14, month: 6 };
const DEPOSIT = 500;
const allHubs = cities.flatMap((c) => c.hubs.map((h) => `${h.name}, ${c.name}`));

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export default function BookingSheet({ open, initial, onClose }: BookingSheetProps) {
  return <AnimatePresence>{open && <BookingPanel initial={initial} onClose={onClose} />}</AnimatePresence>;
}

/** Mounted fresh on every open, so form state starts from whatever the caller preselected. */
function BookingPanel({ initial, onClose }: Omit<BookingSheetProps, "open">) {
  const lenis = useLenis();
  const panelRef = useRef<HTMLDivElement>(null);

  const [bikeId, setBikeId] = useState(initial.bikeId ?? bikes[0].id);
  const [plan, setPlan] = useState<PlanId>(initial.plan ?? "hour");
  const [qty, setQty] = useState(initial.plan === "day" || initial.plan === "month" ? 1 : 2);
  const [hub, setHub] = useState(allHubs[0]);
  const [minDate] = useState(todayISO);
  const [date, setDate] = useState(minDate);
  const [confirmed, setConfirmed] = useState<string | null>(null);

  // Lock page scroll, close on Escape, and move focus into the dialog.
  useEffect(() => {
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => panelRef.current?.focus(), 50);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [lenis, onClose]);

  const bike = bikes.find((b) => b.id === bikeId)!;
  const planInfo = plans.find((p) => p.id === plan)!;
  const subtotal = bike.rates[plan] * qty;
  const deposit = plan === "hour" ? 0 : DEPOSIT;

  const changePlan = (p: PlanId) => {
    setPlan(p);
    setQty((q) => Math.min(q, MAX_QTY[p]));
  };

  const confirm = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(`EC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-6">
      <motion.div
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        tabIndex={-1}
        data-lenis-prevent
        className="relative flex max-h-[92svh] w-full flex-col overflow-hidden rounded-t-[2rem] bg-paper outline-none md:max-w-lg md:rounded-[2rem]"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 32, stiffness: 320 }}
      >
        <div className="flex shrink-0 items-center justify-between px-6 pt-3 pb-2 md:pt-6">
          <span
            aria-hidden
            className="absolute top-2.5 left-1/2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-ink/15 md:hidden"
          />
          <h2 id="booking-title" className="mt-4 font-display text-2xl font-bold tracking-tight md:mt-0">
            {confirmed ? "You're booked!" : "Book your ride"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="mt-4 grid size-10 place-items-center rounded-full bg-sand md:mt-0"
          >
            <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path d="m4 4 8 8m0-8-8 8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {confirmed ? (
          <div className="overflow-y-auto px-6 pt-2 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <div className="rounded-3xl bg-volt p-6">
              <p className="text-sm font-medium text-ink/70">Booking code</p>
              <p className="mt-1 font-display text-4xl font-bold tracking-wider">{confirmed}</p>
            </div>
            <dl className="mt-6 space-y-3 text-sm">
              <Row label="Bike" value={bike.name} />
              <Row label="Duration" value={`${qty} ${qty === 1 ? planInfo.unit : planInfo.unitPlural}`} />
              <Row label="Pickup" value={hub} />
              <Row
                label="Date"
                value={new Date(`${date}T00:00`).toLocaleDateString("en-IN", { dateStyle: "medium" })}
              />
              <Row label="Total" value={inr(subtotal + deposit)} strong />
            </dl>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Show this code at the hub with a government ID. We&apos;ve held your bike for 30 minutes after your pickup
              time.
            </p>
            <button type="button" onClick={onClose} className={`${btnPrimary} mt-8 w-full`}>
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={confirm} className="flex min-h-0 flex-1 flex-col">
            <div className="space-y-7 overflow-y-auto overscroll-contain px-6 pt-2 pb-6">
              <fieldset>
                <legend className="mb-3 text-sm font-semibold">Choose a bike</legend>
                <div className="grid grid-cols-3 gap-2">
                  {bikes.map((b) => (
                    <label
                      key={b.id}
                      className={`cursor-pointer rounded-2xl border-2 p-2 pb-3 text-center transition-colors ${
                        b.id === bikeId ? "border-ink bg-sand" : "border-transparent bg-sand/60"
                      }`}
                    >
                      <input
                        type="radio"
                        name="bike"
                        value={b.id}
                        checked={b.id === bikeId}
                        onChange={() => setBikeId(b.id)}
                        className="sr-only"
                      />
                      <Bike frame={b.frame} variant={b.variant} className="w-full" />
                      <span className="mt-1 block text-sm font-semibold">{b.name}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="mb-3 text-sm font-semibold">Plan</legend>
                <div className="grid grid-cols-3 gap-1 rounded-full bg-sand p-1">
                  {plans.map((p) => (
                    <label
                      key={p.id}
                      className={`relative cursor-pointer rounded-full py-2.5 text-center text-sm font-semibold transition-colors ${
                        p.id === plan ? "text-paper" : "text-ink/70"
                      }`}
                    >
                      <input
                        type="radio"
                        name="plan"
                        value={p.id}
                        checked={p.id === plan}
                        onChange={() => changePlan(p.id)}
                        className="sr-only"
                      />
                      {p.id === plan && (
                        <motion.span
                          layoutId="plan-pill"
                          className="absolute inset-0 rounded-full bg-ink"
                          transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        />
                      )}
                      <span className="relative">{p.name}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold" id="qty-label">
                  How many {planInfo.unitPlural}?
                </span>
                <div className="flex items-center gap-4" role="group" aria-labelledby="qty-label">
                  <Stepper label="Decrease" disabled={qty <= 1} onClick={() => setQty((q) => q - 1)}>
                    −
                  </Stepper>
                  <span className="w-6 text-center font-display text-xl font-bold" aria-live="polite">
                    {qty}
                  </span>
                  <Stepper label="Increase" disabled={qty >= MAX_QTY[plan]} onClick={() => setQty((q) => q + 1)}>
                    +
                  </Stepper>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold">Pickup hub</span>
                  <select
                    value={hub}
                    onChange={(e) => setHub(e.target.value)}
                    className="h-12 w-full rounded-2xl border border-ink/10 bg-sand/60 px-4 text-base"
                  >
                    {allHubs.map((h) => (
                      <option key={h}>{h}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold">Pickup date</span>
                  <input
                    type="date"
                    required
                    value={date}
                    min={minDate}
                    onChange={(e) => setDate(e.target.value)}
                    className="h-12 w-full rounded-2xl border border-ink/10 bg-sand/60 px-4 text-base"
                  />
                </label>
              </div>
            </div>

            <div className="shrink-0 border-t border-ink/10 bg-paper px-6 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <p className="text-sm text-muted">
                    {inr(bike.rates[plan])} × {qty} {qty === 1 ? planInfo.unit : planInfo.unitPlural}
                    {deposit > 0 && ` + ${inr(deposit)} deposit`}
                  </p>
                  <p className="font-display text-3xl font-bold tracking-tight">{inr(subtotal + deposit)}</p>
                </div>
                <p className="pb-1 text-xs text-muted">incl. GST</p>
              </div>
              <button type="submit" className={`${btnPrimary} w-full`}>
                Confirm booking
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}

function Stepper({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-11 place-items-center rounded-full border border-ink/15 text-xl transition-opacity disabled:opacity-30"
    >
      {children}
    </button>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div
      className={`flex justify-between gap-4 ${strong ? "border-t border-ink/10 pt-3 text-base font-semibold" : ""}`}
    >
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
