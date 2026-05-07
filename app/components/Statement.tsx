"use client";

import { ReactNode } from "react";
import { useReveal } from "./hooks/useReveal";

const LINES: ReactNode[] = [
  "CC Design A/S works at the boundary",
  "between architecture, craft, and",
  <span key="t" className="text-fg-subtle">
    technology — delivering built environments
  </span>,
  <span key="d" className="text-fg-subtle">
    and designed spaces that communicate
  </span>,
  <em key="e" className="italic">
    precision, permanence, and care.
  </em>,
];

export function Statement() {
  const [ref, visible] = useReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      className="py-(--space-major) px-(--gutter) max-w-(--max-prose) mx-auto"
    >
      <div
        className="inline-flex items-center font-body text-xs font-medium tracking-[0.14em] uppercase text-fg-subtle transition-opacity duration-600"
        style={{ opacity: visible ? 1 : 0 }}
      >
        00 — Founded · Kerteminde · 2014
      </div>
      <p className="font-display font-light text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.25] tracking-[-0.015em] text-fg mt-8 mb-0 text-pretty">
        {LINES.map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <span
              className="block transition-[transform,opacity] duration-900 ease-(--ease-out-expo)"
              style={{
                transform: visible ? "translateY(0)" : "translateY(110%)",
                opacity: visible ? 1 : 0,
                transitionDelay: `${i * 100}ms`,
              }}
            >
              {line}
            </span>
          </span>
        ))}
      </p>
    </section>
  );
}
