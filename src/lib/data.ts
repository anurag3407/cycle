export type PlanId = "hour" | "day" | "month";

export type BikeModel = {
  id: string;
  name: string;
  tagline: string;
  variant: "city" | "cargo" | "sport";
  frame: string;
  range: number;
  topSpeed: number;
  extra: string;
  rates: Record<PlanId, number>;
};

export const bikes: BikeModel[] = [
  {
    id: "breeze",
    name: "Breeze",
    tagline: "The everyday city cruiser",
    variant: "city",
    frame: "#18291f",
    range: 60,
    topSpeed: 25,
    extra: "Rear rack",
    rates: { hour: 39, day: 299, month: 2499 },
  },
  {
    id: "haul",
    name: "Haul",
    tagline: "Groceries, gear, the lot",
    variant: "cargo",
    frame: "#c2542d",
    range: 50,
    topSpeed: 25,
    extra: "40 kg basket",
    rates: { hour: 59, day: 449, month: 3499 },
  },
  {
    id: "volt",
    name: "Volt",
    tagline: "Longest range, sportiest feel",
    variant: "sport",
    frame: "#2b4bd6",
    range: 80,
    topSpeed: 25,
    extra: "Hydraulic brakes",
    rates: { hour: 69, day: 549, month: 3999 },
  },
];

export const plans: {
  id: PlanId;
  name: string;
  unit: string;
  unitPlural: string;
  blurb: string;
  perks: string[];
  featured?: boolean;
}[] = [
  {
    id: "hour",
    name: "Hourly",
    unit: "hour",
    unitPlural: "hours",
    blurb: "Quick errands and short hops across town.",
    perks: ["Unlock with the app", "Helmet included", "Return at any hub"],
  },
  {
    id: "day",
    name: "Daily",
    unit: "day",
    unitPlural: "days",
    blurb: "Weekend rides, day trips and long explorations.",
    perks: [
      "Everything in Hourly",
      "Spare battery on request",
      "Free 1-hour late return",
    ],
    featured: true,
  },
  {
    id: "month",
    name: "Monthly",
    unit: "month",
    unitPlural: "months",
    blurb: "Your own e-cycle for the daily commute, minus the upkeep.",
    perks: [
      "Free servicing & repairs",
      "Unlimited battery swaps",
      "Swap models anytime",
    ],
  },
];

export const steps = [
  {
    title: "Pick your ride",
    body: "Choose a model, a plan and the hub nearest to you. Takes about thirty seconds.",
  },
  {
    title: "Unlock at the hub",
    body: "Show your booking code, grab a helmet and you're set. No paperwork, no queue.",
  },
  {
    title: "Ride & return",
    body: "Pedal-assist up to 25 km/h. Drop it back at any hub in the city when you're done.",
  },
];

export const stats = [
  { value: 120000, suffix: "+", label: "Rides completed" },
  { value: 340, suffix: " t", label: "CO₂ avoided" },
  { value: 48, suffix: "", label: "Pickup hubs" },
  { value: 4.8, suffix: "★", label: "Average rating", decimals: 1 },
];

export const cities: { name: string; hubs: { name: string; area: string; hours: string }[] }[] = [
  {
    name: "Bengaluru",
    hubs: [
      { name: "Koramangala", area: "80 Feet Rd, 4th Block", hours: "6am – 11pm" },
      { name: "Indiranagar", area: "100 Feet Rd, near Metro", hours: "6am – 11pm" },
      { name: "HSR Layout", area: "27th Main, Sector 1", hours: "7am – 10pm" },
    ],
  },
  {
    name: "Pune",
    hubs: [
      { name: "Koregaon Park", area: "Lane 6, North Main Rd", hours: "6am – 10pm" },
      { name: "Baner", area: "Baner–Pashan Link Rd", hours: "7am – 10pm" },
    ],
  },
  {
    name: "Bhubaneswar",
    hubs: [
      { name: "Saheed Nagar", area: "Near Ram Mandir", hours: "6am – 10pm" },
      { name: "Patia", area: "KIIT Square", hours: "6am – 11pm" },
    ],
  },
  {
    name: "Hyderabad",
    hubs: [
      { name: "Gachibowli", area: "DLF Cyber City Gate 2", hours: "6am – 11pm" },
      { name: "Jubilee Hills", area: "Road No. 36", hours: "7am – 10pm" },
    ],
  },
];

export const testimonials = [
  {
    quote:
      "I switched my 9 km office commute to a monthly Breeze. I arrive fresh, I skip traffic, and I spend less than I did on cabs.",
    name: "Riya",
    role: "Product designer, monthly rider",
  },
  {
    quote:
      "The Haul basket fits a full week of groceries. Booking took less time than finding parking ever did.",
    name: "Arjun",
    role: "Daily rider",
  },
  {
    quote:
      "Rented two Volts for a Sunday ride with a friend. Climbed hills we'd never try on regular cycles.",
    name: "Meera",
    role: "Weekend explorer",
  },
];

export const faqs = [
  {
    q: "Do I need a driving licence?",
    a: "No. Our e-cycles are pedal-assist with a top speed of 25 km/h, so no licence or registration is needed. You only need a valid government ID at pickup.",
  },
  {
    q: "How far can I go on one charge?",
    a: "Between 50 and 80 km depending on the model, your weight and how much assist you use. Daily and monthly riders can swap batteries at any hub for free.",
  },
  {
    q: "Is there a security deposit?",
    a: "Daily and monthly plans carry a refundable ₹500 deposit, returned to your original payment method within 48 hours of drop-off. Hourly rides have no deposit.",
  },
  {
    q: "What if the bike breaks down?",
    a: "Call or message us from the app. We'll send a replacement or a mechanic to you, and the time doesn't count against your rental.",
  },
  {
    q: "Can I return it to a different hub?",
    a: "Yes, any hub in the same city. Just end the ride in the app once you've docked it.",
  },
];

export const navLinks = [
  { href: "#how", label: "How it works" },
  { href: "#fleet", label: "Fleet" },
  { href: "#pricing", label: "Pricing" },
  { href: "#hubs", label: "Hubs" },
  { href: "#faq", label: "FAQ" },
];

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
