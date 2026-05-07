import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Statement } from "./components/Statement";
import { Projects } from "./components/Projects";
import { Services } from "./components/Services";
import { Process } from "./components/Process";
import { Testimonial } from "./components/Testimonial";
import { Studio } from "./components/Studio";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="absolute -left-[9999px] focus:fixed focus:left-4 focus:top-4 focus:bg-fg focus:text-fg-inverse focus:px-4 focus:py-3 focus:z-[100] focus:font-body focus:text-[13px]"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Statement />
        <Projects />
        <Services />
        <Process />
        <Testimonial />
        <Studio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
