"use client";

import { useReveal } from "./hooks/useReveal";

const STEPS = [
  {
    num: "01",
    title: "Survey & Analysis",
    body: "Bathymetric surveys and seabed analysis. We establish the technical foundation before engineering begins.",
  },
  {
    num: "02",
    title: "Engineering",
    body: "Precise ingeniørberegninger for structural loads, currents, and ice pressure. Methodical design for longevity.",
  },
  {
    num: "03",
    title: "Permitting",
    body: "Handling complex municipal and environmental approvals. We navigate the regulatory landscape as totalentreprenør.",
  },
  {
    num: "04",
    title: "Execution",
    body: "Specialised marine construction with direct oversight. Precision-led delivery in challenging environments.",
  },
  {
    num: "05",
    title: "Lifecycle",
    body: "Handover with comprehensive documentation. We ensure low maintenance and long-term structural health.",
  },
];

export function Process() {
  const [ref, visible] = useReveal<HTMLElement>();
  return (
    <section ref={ref} id="process" className="py-(--space-major) px-(--gutter)">
      <div className="flex items-end justify-between mb-20 flex-wrap gap-6">
        <div>
          <div className="inline-flex items-center font-body text-xs font-medium tracking-[0.14em] uppercase text-fg-subtle">
            Projekteringsprocessen · Five Stages
          </div>
          <h2 className="font-display font-light text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-[-0.02em] mt-5 mb-0 text-fg">
            A methodical approach,
            <br />
            to marine engineering.
          </h2>
        </div>
        <p className="font-body text-base leading-[1.7] max-w-90 m-0 text-fg-muted">
          Every project follows a rigorous five-stage process. From seabed
          analysis to long-term lifecycle management, we own the complexity.
        </p>
      </div>

      <div className="grid grid-cols-1 max-[720px]:grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {STEPS.map((s, i) => (
          <div
            key={s.num}
            className="relative pt-8 border-t border-fg/15 transition-[opacity,transform] duration-600 ease-(--ease-out-expo)"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: `${i * 120}ms`,
            }}
          >
            <div
              className="absolute -top-px left-0 h-px bg-accent transition-[width] duration-700 ease-(--ease-out-expo)"
              style={{
                width: visible ? "100%" : "0%",
                transitionDelay: `${i * 120 + 200}ms`,
              }}
            />
            <div className="font-mono text-xs tracking-widest text-accent">
              / {s.num}
            </div>
            <h3 className="font-display font-light text-[clamp(1.5rem,2.4vw,2rem)] my-4 text-fg tracking-[-0.01em]">
              {s.title}
            </h3>
            <p className="font-body text-[15px] leading-[1.65] text-fg-muted m-0">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
