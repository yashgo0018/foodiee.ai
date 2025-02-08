import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Features />
        <HowItWorks />
        <Footer />
      </main>
    </>
  );
}
