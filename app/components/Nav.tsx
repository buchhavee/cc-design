"use client";

import { useEffect, useState } from "react";
import { CCLogo } from "./CCLogo";

const NAV_ITEMS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Studio", href: "#studio" },
  { label: "Journal", href: "#journal" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-18 flex items-center px-(--gutter) border-b text-fg-inverse transition-[background-color,border-color,backdrop-filter] duration-320 ease-(--ease-out-quart) ${
        scrolled
          ? "bg-fg-muted/40 backdrop-blur-[18px] backdrop-saturate-150 border-fg-inverse/10"
          : "bg-transparent border-transparent"
      }`}
    >
      <a
        href="#top"
        aria-label="CC Design — back to top"
        className="inline-flex items-center text-fg-inverse no-underline transition-opacity duration-240 hover:opacity-75"
      >
        <CCLogo size={28} layout="inline" color="currentColor" />
      </a>

      <nav className="ml-auto flex items-center gap-9" aria-label="Primary">
        {NAV_ITEMS.map((item, idx) => (
          <a
            key={item.label}
            href={item.href}
            className="group relative max-[720px]:hidden inline-flex items-baseline gap-1.5 py-1.5 font-body text-[12px] font-medium tracking-[0.14em] uppercase text-fg-inverse/70 no-underline transition-colors duration-240 ease-(--ease-out-quart) hover:text-fg-inverse"
          >
            <span className="font-mono text-[9px] font-normal tracking-[0.04em] text-fg-inverse/30 tabular-nums">
              0{idx + 1}
            </span>
            <span className="relative">
              {item.label}
              <span
                aria-hidden="true"
                className="absolute left-0 -bottom-0.75 h-px w-0 bg-accent-bright transition-[width] duration-320 ease-(--ease-out-quart) group-hover:w-full"
              />
            </span>
          </a>
        ))}

        <span
          aria-hidden="true"
          className="max-[720px]:hidden w-px h-4 bg-fg-inverse/20"
        />

        <button
          type="button"
          aria-label="Switch language"
          className="max-[720px]:hidden font-mono text-[10px] font-normal tracking-[0.2em] uppercase text-fg-inverse/55 hover:text-fg-inverse/95 transition-colors duration-240 cursor-pointer bg-transparent border-0 p-0"
        >
          EN<span className="mx-1.5 text-fg-inverse/25">/</span>DA
        </button>

        <a
          href="#contact"
          className="group inline-flex items-center gap-3 pl-5 pr-4 py-3 border border-fg-inverse/45 text-fg-inverse font-body text-[11px] font-medium tracking-[0.2em] uppercase no-underline cursor-pointer transition-[background-color,color,border-color] duration-240 ease-(--ease-out-quart) hover:bg-fg-inverse hover:text-fg hover:border-fg-inverse"
        >
          <span>Contact</span>
          <span
            aria-hidden="true"
            className="inline-block w-1.5 h-1.5 rounded-full bg-accent-bright transition-transform duration-320 ease-(--ease-out-quart) group-hover:scale-125 group-hover:bg-accent"
          />
        </a>
      </nav>
    </header>
  );
}
