"use client";

import { Placeholder } from "./Placeholder";
import { useReveal } from "./hooks/useReveal";

export function Testimonial() {
  const [ref, visible] = useReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      className="bg-bg-soft py-(--space-major) px-(--gutter)"
    >
      <div className="max-w-270 mx-auto grid grid-cols-1 lg:grid-cols-[7fr_4fr] gap-12 lg:gap-20 items-center">
        <div>
          <div className="inline-flex items-center font-body text-xs font-medium tracking-[0.14em] uppercase text-fg-subtle">
            In Their Words
          </div>
          <p className="font-display font-light text-[clamp(1.75rem,3vw,2.6rem)] leading-[1.3] tracking-[-0.015em] text-fg mt-8 mb-10 text-pretty">
            <span className="text-accent mr-1.5">—</span>
            They held the line on details no one else would have noticed. The
            result is a building that feels{" "}
            <em className="italic">inevitable</em>. That is the highest
            compliment I can give.
          </p>
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-fg-muted" />
            <span className="font-body text-xs font-medium tracking-[0.12em] uppercase text-fg-muted">
              Henrik Lund · Principal, Lund &amp; Partners · Hav House
            </span>
          </div>
        </div>
        <div
          className="transition-[opacity,transform] duration-1200 ease-(--ease-out-expo)"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(1.04)",
          }}
        >
          <Placeholder
            label="Project reference · Hav House detail · 4/5"
            ratio="4/5"
            tint="soft"
          />
        </div>
      </div>
    </section>
  );
}
