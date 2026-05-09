"use client";

import { useEffect, useRef, useState } from "react";
import { CCLogo } from "./CCLogo";

type CardLink = { label: string; href: string; ariaLabel: string };

type CardItem = {
  label: string;
  bgClass: string;
  textClass: string;
  links: CardLink[];
};

const CARDS: CardItem[] = [
  {
    label: "Work",
    bgClass: "bg-fg",
    textClass: "text-fg-inverse",
    links: [
      { label: "Featured Projects", href: "#work", ariaLabel: "Featured projects" },
      { label: "Case Studies", href: "#work", ariaLabel: "Case studies" },
      { label: "Journal", href: "#journal", ariaLabel: "Journal" },
    ],
  },
  {
    label: "Studio",
    bgClass: "bg-fg-muted",
    textClass: "text-fg-inverse",
    links: [
      { label: "About", href: "#studio", ariaLabel: "About the studio" },
      { label: "Process", href: "#process", ariaLabel: "Our process" },
      { label: "Services", href: "#services", ariaLabel: "Services" },
    ],
  },
  {
    label: "Contact",
    bgClass: "bg-accent",
    textClass: "text-fg-inverse",
    links: [
      { label: "Email", href: "#contact", ariaLabel: "Email CC Design" },
      { label: "LinkedIn", href: "#contact", ariaLabel: "CC Design on LinkedIn" },
      { label: "Phone", href: "#contact", ariaLabel: "Call CC Design" },
    ],
  },
];

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 14 14"
      width="14"
      height="14"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M3.5 10.5 L10.5 3.5 M5 3.5 H10.5 V9"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CardNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const burgerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navClasses = scrolled
    ? "border-fg/10 bg-bg-soft text-fg"
    : "border-fg-inverse/15 bg-fg/35 backdrop-blur-[18px] backdrop-saturate-150 text-fg-inverse";

  const ctaClasses = scrolled
    ? "bg-fg text-fg-inverse hover:bg-fg/90"
    : "bg-fg-inverse text-fg hover:bg-fg-inverse/90";

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 px-(--gutter) pointer-events-none"
      style={{ paddingTop: "max(env(safe-area-inset-top), 12px)" }}
    >
      <nav
        aria-label="Primary"
        className={`pointer-events-auto mx-auto w-full max-w-[920px] rounded-2xl border shadow-[0_4px_24px_rgba(0,0,0,0.12)] transition-[background-color,color,border-color] duration-320 ease-(--ease-out-quart) ${navClasses}`}
      >
        <div className="relative flex h-15 items-center px-3 sm:px-4">
          <button
            ref={burgerRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="cardnav-cards"
            onClick={() => setOpen((v) => !v)}
            data-open={open || undefined}
            className="group inline-flex h-9 w-9 flex-col items-center justify-center gap-1.5 cursor-pointer bg-transparent border-0 p-0 text-current"
          >
            <span className="block h-px w-6 bg-current transition-transform duration-240 ease-(--ease-out-quart) origin-center group-data-open:translate-y-0.75 group-data-open:rotate-45" />
            <span className="block h-px w-6 bg-current transition-transform duration-240 ease-(--ease-out-quart) origin-center group-data-open:-translate-y-0.75 group-data-open:-rotate-45" />
          </button>

          <button
            type="button"
            aria-label="Switch language"
            className="ml-2 hidden min-[480px]:inline-flex font-mono text-[10px] font-normal tracking-[0.2em] uppercase opacity-70 hover:opacity-100 transition-opacity duration-240 cursor-pointer bg-transparent border-0 p-0"
          >
            EN<span className="mx-1 opacity-40">/</span>DA
          </button>

          <a
            href="#top"
            aria-label="CC Design — back to top"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center text-current no-underline transition-opacity duration-240 hover:opacity-75"
          >
            <CCLogo size={22} layout="inline" color="currentColor" />
          </a>

          <a
            href="#contact"
            className={`ml-auto hidden md:inline-flex items-center gap-2 rounded-xl px-4 py-2 font-body text-[11px] font-medium tracking-[0.18em] uppercase no-underline cursor-pointer transition-colors duration-240 ease-(--ease-out-quart) ${ctaClasses}`}
          >
            <span>Contact</span>
            <span aria-hidden="true" className="inline-block w-1.5 h-1.5 rounded-full bg-accent-bright" />
          </a>
        </div>
        <div
          id="cardnav-cards"
          aria-hidden={!open}
          className={`grid transition-[grid-template-rows] duration-400 ease-(--ease-out-quart) ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        >
          <div className="overflow-hidden min-h-0">
            <div className="flex flex-col gap-2 p-2 md:flex-row md:gap-3">
              {CARDS.map((card, idx) => (
                <div
                  key={card.label}
                  className={`flex flex-1 flex-col rounded-xl px-5 py-4 ${card.bgClass} ${card.textClass} min-h-35 transition-[opacity,transform] duration-320 ease-(--ease-out-quart) ${
                    open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                  }`}
                  style={{ transitionDelay: open ? `${idx * 60}ms` : "0ms" }}
                >
                  <div className="font-display text-[22px] font-normal tracking-[-0.01em]">
                    {card.label}
                  </div>
                  <div className="mt-auto flex flex-col gap-1.5 pt-4">
                    {card.links.map((link, linkIdx) => (
                      <a
                        key={link.label}
                        ref={idx === 0 && linkIdx === 0 ? firstLinkRef : undefined}
                        href={link.href}
                        aria-label={link.ariaLabel}
                        tabIndex={open ? 0 : -1}
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center gap-2 font-body text-[15px] no-underline opacity-90 hover:opacity-100 transition-opacity duration-240"
                      >
                        <ArrowIcon />
                        <span>{link.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
