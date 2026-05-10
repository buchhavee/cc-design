"use client";

import { Placeholder } from "./Placeholder";
import { useReveal } from "./hooks/useReveal";

const PROJECTS = [
  {
    idx: "01",
    title: "Islands Brygge Havnebad",
    category: "Structural Repair",
    location: "Copenhagen, DK",
    year: "2025",
    span: 7,
    scale: "840m² structural renovation",
  },
  {
    idx: "02",
    title: "Nordhavn Quay Wall",
    category: "Harbour Construction",
    location: "Copenhagen, DK",
    year: "2024",
    span: 5,
    scale: "120m sheet pile construction",
  },
  {
    idx: "03",
    title: "Reykjavík Pier Upgrade",
    category: "Marine Engineering",
    location: "Reykjavík, IS",
    year: "2024",
    span: 5,
    scale: "Ice-pressure load calculation",
  },
  {
    idx: "04",
    title: "Aarhus East Infrastructure",
    category: "Coastal Protection",
    location: "Aarhus, DK",
    year: "2023",
    span: 7,
    scale: "Klimatilpasning & Surge protection",
  },
];

const eyebrow = "inline-flex items-center font-body text-xs font-medium tracking-[0.14em] uppercase text-fg-subtle";

export function Projects() {
  const [ref, visible] = useReveal<HTMLElement>();
  return (
    <section ref={ref} id="work" className="px-(--gutter) py-[clamp(56px,7vh,96px)]">
      <div className="flex items-end justify-between mb-12 flex-wrap gap-8">
        <div>
          <div className={eyebrow}>Selected Projects · International References</div>
          <h2 className="font-display font-light text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.02em] mt-5 mb-0 text-fg">
            Structural references,
            <br />
            <em className="italic">built</em> for longevity.
          </h2>
        </div>
        <a href="#all" className="group inline-flex items-center gap-3 pb-1.5 border-b border-fg text-fg font-body text-[13px] font-medium tracking-widest uppercase no-underline transition-colors duration-240 hover:text-accent hover:border-accent">
          View all 27 projects{" "}
          <span aria-hidden="true" className="inline-block transition-transform duration-280 ease-(--ease-out-quart) group-hover:translate-x-1.5">
            →
          </span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6">
        {PROJECTS.map((p, i) => (
          <a
            key={p.idx}
            href={`#project-${p.idx}`}
            className={`group block text-inherit no-underline transition-[opacity,transform] duration-800 ease-(--ease-out-expo) ${
              p.span === 7 ? "md:col-span-7" : "md:col-span-5"
            }`}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transitionDelay: `${i * 120}ms`,
            }}
          >
            <div className="relative overflow-hidden bg-bg-soft h-[clamp(180px,26vh,320px)]">
              <div className="h-full will-change-transform transition-transform duration-900 ease-(--ease-out-quart) group-hover:scale-[1.06]">
                <Placeholder label={`Project · ${p.title}`} fill />
              </div>
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-(--ease-out-quart) group-hover:opacity-100 bg-[linear-gradient(180deg,transparent_45%,rgba(28,28,26,0.55)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 flex items-end p-6 overflow-hidden">
                <span className="inline-flex items-center gap-2 text-fg-inverse font-body text-xs font-medium tracking-[0.14em] uppercase translate-y-3 opacity-0 transition-[transform,opacity] duration-500 ease-(--ease-out-quart) group-hover:translate-y-0 group-hover:opacity-100">
                  View Project
                  <span aria-hidden="true" className="inline-block transition-transform duration-500 ease-(--ease-out-quart) group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </div>
            <div className="flex justify-between items-baseline mt-5 gap-4">
              <div>
                <div className="font-body text-[11px] font-medium tracking-[0.12em] uppercase text-fg-subtle">
                  {p.idx} · {p.category}
                </div>
                <h3 className="font-display font-normal text-[clamp(1.4rem,2vw,1.85rem)] mt-2 mb-0 text-fg tracking-[-0.01em] transition-colors duration-500 ease-(--ease-out-quart) group-hover:text-accent">{p.title}</h3>
                <div className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle mt-1.5">{p.scale}</div>
              </div>
              <div className="font-mono text-xs text-fg-subtle whitespace-nowrap transition-colors duration-500 ease-(--ease-out-quart) group-hover:text-fg-muted">
                {p.location} · {p.year}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
