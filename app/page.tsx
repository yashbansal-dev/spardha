import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import Events from "@/components/sections/Events";
import Schedule from "@/components/sections/Schedule";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-spardha-bg text-white selection:bg-neon-cyan selection:text-black">
      <Navbar />
      <Hero />
      <About />
      <Stats />
      <Events />
      <Schedule />
      <Contact />
      <Footer />
    </main>
  );
}
