"use client";

import Image from "next/image";
import { useReveal } from "./hooks/useReveal";
import { useParallax } from "./hooks/useParallax";

export function Hero() {
  const [ref, visible] = useReveal<HTMLElement>(0.05);
  const parallaxY = useParallax(0.5);

  return (
    <section ref={ref} id="top" className="relative h-svh md:h-auto md:min-h-svh flex items-center px-(--gutter) pt-20 pb-16 md:pt-24 md:pb-28 overflow-hidden bg-bg-inverse">
      {/* Background — parallax outer layer (no transition, tracks scroll) */}
      <div className="absolute inset-0 overflow-hidden will-change-transform" style={{ transform: `translate3d(0, ${parallaxY}px, 0)` }}>
        {/* Reveal inner layer (scale + fade on mount) */}
        <div
          className="absolute inset-0 transition-[opacity,transform] duration-1600 ease-(--ease-out-expo)"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1.015)" : "scale(1.05)",
          }}
        >
          <Image src="/assets/havnebad-bg.jpeg" alt="" fill priority sizes="100vw" style={{ objectFit: "cover", filter: "blur(1px)" }} />
        </div>
      </div>

      {/* black/30 base overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Atmospheric overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(14,14,13,0.20) 0%, rgba(14,14,13,0.05) 35%, rgba(14,14,13,0.65) 100%)",
        }}
      />

      {/* Centered content grid — text and image share a vertical axis */}
      <div className="relative z-5 w-full max-w-(--max-page) mx-auto grid grid-cols-1 md:grid-cols-12 items-center gap-8 md:gap-10 lg:gap-16">
        {/* Foreground text */}
        <div className="md:col-span-7 lg:col-span-7 order-2 md:order-1">
          <div className="inline-flex items-center font-body text-xs font-medium tracking-[0.14em] uppercase text-fg-inverse/75 mb-4 md:mb-10 transition-opacity duration-600 delay-200" style={{ opacity: visible ? 1 : 0 }}>
            <span className="text-accent">●</span>
            &nbsp;&nbsp;Available for select 2026 commissions
          </div>
          <h1 className="font-display font-light text-[clamp(1.85rem,7vw,6.8rem)] leading-[1.05] md:leading-[1.02] tracking-tight m-0 text-fg-inverse text-balance">
            {[0, 1].map((i) => (
              <span key={i} className="block overflow-hidden">
                <span
                  className="block transition-[transform,opacity] duration-900 ease-(--ease-out-expo)"
                  style={{
                    transform: visible ? "translateY(0)" : "translateY(110%)",
                    opacity: visible ? 1 : 0,
                    transitionDelay: `${400 + i * 120}ms`,
                  }}
                >
                  {i === 0 ? <strong style={{ fontWeight: "inherit" }}>Maritime design shaped by</strong> : <em className="italic font-display">experience.</em>}
                </span>
              </span>
            ))}
          </h1>
          <div
            className="flex items-start sm:items-center gap-5 sm:gap-8 flex-col sm:flex-row sm:flex-wrap mt-6 md:mt-14 transition-[opacity,transform] duration-700 delay-900 ease-(--ease-out-expo)"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <p className="m-0 font-body text-sm md:text-lg leading-[1.6] md:leading-[1.65] font-normal text-fg-inverse/80 max-w-[460px]">From concept to construction, we create durable, functional solutions for the maritime industry, developed through years of hands-on expertise.</p>
          </div>
        </div>

        {/* Inset architectural image — sits beside the text on desktop, above on mobile */}
        <div
          className="md:col-span-5 lg:col-span-5 order-1 md:order-2 relative w-full max-w-[200px] sm:max-w-[280px] md:max-w-none aspect-4/5 mx-auto md:mr-0 md:ml-auto overflow-hidden shadow-[0_24px_64px_rgba(14,14,13,0.32)] transition-[opacity,transform] duration-1400 delay-300 ease-(--ease-out-expo)"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(1.04)",
          }}
        >
          <Image src="/assets/havnebad-hero.jpeg" alt="Havnebad — aerial view of a harbor bath project by CC Design" fill sizes="(max-width: 768px) 60vw, (max-width: 1024px) 42vw, 520px" style={{ objectFit: "cover" }} />
          <div className="absolute left-3 right-3 bottom-3 sm:left-4 sm:bottom-4 sm:right-auto font-mono text-[10px] sm:text-[11px] tracking-[0.08em] uppercase text-fg-inverse/90 bg-[rgba(14,14,13,0.42)] px-2.5 py-1.5 backdrop-blur-md">Islands Brygges Havnebad Renovation · Featured Project</div>
        </div>
      </div>

      {/* Scroll indicator — refined traveling segment, centered */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-5 md:bottom-9 flex flex-col items-center gap-2.5 md:gap-3 font-body text-[10px] tracking-[0.28em] uppercase text-fg-inverse/55 transition-opacity duration-700 delay-1100" style={{ opacity: visible ? 1 : 0 }}>
        <span>Scroll</span>
        <div className="relative w-px h-11 overflow-hidden bg-fg-inverse/20">
          <div className="absolute inset-x-0 top-0 h-1/3 bg-fg-inverse/90" style={{ animation: "scrollHint 2.4s var(--ease-out-quart) infinite" }} />
        </div>
      </div>
    </section>
  );
}
