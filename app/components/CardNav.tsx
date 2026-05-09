"use client";

import { CCLogo } from "./CCLogo";

export function CardNav() {
  return (
    <div
      className="fixed inset-x-0 top-0 z-50 px-(--gutter) pointer-events-none"
      style={{ paddingTop: "max(env(safe-area-inset-top), 12px)" }}
    >
      <nav
        aria-label="Primary"
        className="pointer-events-auto mx-auto w-full max-w-[920px] rounded-2xl border border-fg-inverse/15 bg-fg/35 backdrop-blur-[18px] backdrop-saturate-150 text-fg-inverse shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
    >
      <div className="relative flex h-15 items-center px-3 sm:px-4">
        {/* Burger (visual only for now) */}
        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex h-9 w-9 flex-col items-center justify-center gap-1.5 cursor-pointer bg-transparent border-0 p-0 text-current"
        >
          <span className="block h-px w-6 bg-current transition-transform duration-240 ease-(--ease-out-quart)" />
          <span className="block h-px w-6 bg-current transition-transform duration-240 ease-(--ease-out-quart)" />
        </button>

        {/* EN/DA toggle */}
        <button
          type="button"
          aria-label="Switch language"
          className="ml-2 hidden min-[480px]:inline-flex font-mono text-[10px] font-normal tracking-[0.2em] uppercase opacity-70 hover:opacity-100 transition-colors duration-240 cursor-pointer bg-transparent border-0 p-0"
        >
          EN<span className="mx-1 opacity-40">/</span>DA
        </button>

        {/* Centered logo */}
        <a
          href="#top"
          aria-label="CC Design — back to top"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center text-current no-underline transition-opacity duration-240 hover:opacity-75"
        >
          <CCLogo size={22} layout="inline" color="currentColor" />
        </a>

        {/* Contact CTA, hidden on mobile */}
        <a
          href="#contact"
          className="ml-auto hidden md:inline-flex items-center gap-2 rounded-xl bg-fg-inverse px-4 py-2 text-fg font-body text-[11px] font-medium tracking-[0.18em] uppercase no-underline cursor-pointer transition-colors duration-240 ease-(--ease-out-quart) hover:bg-fg-inverse/90"
        >
          <span>Contact</span>
          <span aria-hidden="true" className="inline-block w-1.5 h-1.5 rounded-full bg-accent-bright" />
        </a>
      </div>
    </nav>
  </div>
);
}
