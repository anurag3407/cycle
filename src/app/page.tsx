import FAQ from "@/components/FAQ";
import Fleet from "@/components/Fleet";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Hubs from "@/components/Hubs";
import Impact from "@/components/Impact";
import Marquee from "@/components/Marquee";
import MobileBookBar from "@/components/MobileBookBar";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <HowItWorks />
        <Fleet />
        <Pricing />
        <Impact />
        <Testimonials />
        <Hubs />
        <FAQ />
      </main>
      <Footer />
      <MobileBookBar />
    </>
  );
}
