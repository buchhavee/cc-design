"use client";

import { Placeholder } from "./Placeholder";
import { useReveal } from "./hooks/useReveal";

const STATS = [
  { n: "27", l: "Projects delivered" },
  { n: "12", l: "Years active" },
  { n: "04", l: "Countries built in" },
];

export function Studio() {
  const [ref, visible] = useReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      id="studio"
      className="py-(--space-major) px-(--gutter)"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-12 lg:gap-20 items-center max-w-(--max-page) mx-auto">
        <div
          className="transition-[opacity,transform] duration-1000 ease-(--ease-out-expo)"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-20px)",
          }}
        >
          <Placeholder
            label="Studio · Maria Kesby Christiansen · principal portrait"
            ratio="4/5"
          />
        </div>
        <div>
          <div className="inline-flex items-center font-body text-xs font-medium tracking-[0.14em] uppercase text-fg-subtle">
            The Studio
          </div>
          <h2 className="font-display font-light text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] tracking-[-0.02em] mt-5 mb-8 text-fg">
            Founded in Kerteminde,
            <br />
            <em className="italic">practiced</em> across World.
          </h2>
          <p className="font-body text-[17px] leading-[1.7] text-fg-muted max-w-120 mb-12">
            CC Design A/S was founded in 2014 by Maria Kesby Christiansen as a
            small, principal-led studio. We remain small by intention — every
            project carries the principal&apos;s hand from first conversation
            to final inspection.
          </p>

          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-fg/15">
            {STATS.map((s) => (
              <div key={s.l}>
                <div className="font-display font-light text-[clamp(2rem,3.5vw,3rem)] text-fg tracking-[-0.02em] leading-none">
                  {s.n}
                </div>
                <div className="font-body text-xs font-medium tracking-widest uppercase text-fg-subtle mt-3">
                  {s.l}
                </div>
              </div>
            ))}
          </div>

          <a
            href="#about"
            className="group inline-flex items-center gap-3 pb-1.5 border-b border-fg text-fg font-body text-[13px] font-medium tracking-widest uppercase no-underline transition-colors duration-240 hover:text-accent hover:border-accent mt-12"
          >
            About the studio{" "}
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-280 ease-(--ease-out-quart) group-hover:translate-x-1.5"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
