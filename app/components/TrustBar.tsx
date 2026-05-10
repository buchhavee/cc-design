"use client";

import { useReveal } from "./hooks/useReveal";

const CLIENTS = [
  { name: "By & Havn", location: "Copenhagen" },
  { name: "Aarhus Havn", location: "Aarhus" },
  { name: "Københavns Kommune", location: "Copenhagen" },
  { name: "Odense Havn", location: "Odense" },
  { name: "Esbjerg Havn", location: "Esbjerg" },
  { name: "Metroselskabet", location: "Denmark" },
];

export function TrustBar() {
  const [ref, visible] = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="py-12 border-y border-fg/10 bg-bg-soft/30 px-(--gutter)"
    >
      <div className="max-w-(--max-page) mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="font-body text-[10px] font-medium tracking-[0.2em] uppercase text-fg-subtle whitespace-nowrap">
            Trusted by industrial & municipal partners
          </div>

          <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-12 gap-y-8 opacity-60 grayscale transition-opacity hover:opacity-100 duration-500">
            {CLIENTS.map((client, i) => (
              <div
                key={client.name}
                className="flex flex-col items-center md:items-start transition-[opacity,transform] duration-700 ease-(--ease-out-expo)"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(10px)",
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <span className="font-display font-medium text-lg text-fg tracking-tight">
                  {client.name}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-fg-subtle mt-0.5">
                  {client.location}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
