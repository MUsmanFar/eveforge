import {
  About,
  Contact,
  Hero,
  Process,
  Services,
  Why,
  Work,
} from "@/components/sections";
import { Footer } from "@/components/layout";

export default function HomePage() {
  return (
    <main id="main" className="flex-1">
      <Hero />
      <About />
      <Services />
      <Work />
      <Process />
      <Why />
      <Contact />
      <Footer />
    </main>
  );
}
