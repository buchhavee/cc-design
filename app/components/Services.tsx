"use client";

import { useState } from "react";
import { useReveal } from "./hooks/useReveal";

const SERVICES = [
  {
    num: "01",
    title: "Architectural Design",
    desc: "Master planning, schematic and detailed design for residential, cultural, and mixed-use commissions across Scandinavia.",
  },
  {
    num: "02",
    title: "Interior & Spatial Design",
    desc: "Material specification, furniture, lighting, and atmosphere — interiors developed in lockstep with the architecture.",
  },
  {
    num: "03",
    title: "Premium Construction Consultancy",
    desc: "Direct, principal-led oversight from tender through completion. Documentation precision; site presence; trade coordination.",
  },
  {
    num: "04",
    title: "Brand Environment Strategy",
    desc: "Spatial expression of brand for hospitality, retail, and cultural institutions. Where identity meets architecture.",
  },
  {
    num: "05",
    title: "Renovation & Heritage",
    desc: "Sensitive intervention on listed and historic structures. Conservation-first methodology with contemporary insertion.",
  },
];

export function Services() {
  const [open, setOpen] = useState(0);
  const [ref, visible] = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="services"
      className="relative overflow-hidden bg-bg-inverse text-fg-inverse py-(--space-major) px-(--gutter)"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20 items-start">
        <div className="lg:sticky lg:top-30">
          <div className="inline-flex items-center font-body text-xs font-medium tracking-[0.14em] uppercase text-fg-inverse/55">
            Our Scope · Five Disciplines
          </div>
          <h2 className="font-display font-light text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.05] tracking-[-0.02em] mt-5 mb-8 text-fg-inverse">
            Five disciplines.
            <br />
            <em className="italic">One</em> studio.
          </h2>
          <p className="font-body text-base leading-[1.7] text-fg-inverse/70 max-w-[440px] m-0">
            We work across the lifecycle of a built environment — from first
            sketch to completed handover — with the same hand throughout. Click
            a discipline to read more.
          </p>
        </div>

        <div>
          {SERVICES.map((s, i) => {
            const isOpen = open === i;
            return (
              <div
                key={s.num}
                className={`border-b border-fg-inverse/20 transition-[opacity,transform] duration-600 ease-(--ease-out-expo) ${
                  i === 0 ? "border-t" : ""
                }`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="group w-full bg-transparent border-none flex items-center gap-6 py-7 cursor-pointer text-left text-inherit"
                >
                  <span
                    className={`font-mono text-xs tracking-[0.08em] transition-colors duration-200 ${
                      isOpen ? "text-accent" : "text-fg-inverse/55"
                    }`}
                  >
                    {s.num}
                  </span>
                  <span className="font-display font-light text-[clamp(1.4rem,2.4vw,2rem)] text-fg-inverse flex-1 tracking-[-0.01em] transition-colors duration-240 group-hover:text-accent">
                    {s.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-body text-[22px] font-light text-fg-inverse/70 transition-transform duration-320 ease-(--ease-out-expo)"
                    style={{
                      transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-360 ease-(--ease-out-expo)"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p
                      className="font-body text-base leading-[1.7] text-fg-inverse/80 max-w-[620px] m-0 mb-7 pl-[60px] transition-opacity duration-320 delay-80"
                      style={{ opacity: isOpen ? 1 : 0 }}
                    >
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
