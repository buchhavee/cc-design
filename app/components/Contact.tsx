"use client";

import { useReveal } from "./hooks/useReveal";

type ContactItem = { l: string; v: string; h: string | null };

const ITEMS: ContactItem[] = [
  { l: "Phone", v: "+45 26 83 31 80", h: "tel:+4526833180" },
  { l: "Email", v: "mk@ccdesign.dk", h: "mailto:mk@ccdesign.dk" },
  { l: "Web", v: "www.ccdesign.dk", h: "https://www.ccdesign.dk" },
  { l: "Studio", v: "Kohaven 15, 5300 Kerteminde, Danmark", h: null },
];

export function Contact() {
  const [ref, visible] = useReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      id="contact"
      className="py-(--space-major) px-(--gutter) bg-bg border-t border-fg/15"
    >
      <div className="max-w-(--max-page) mx-auto">
        <div className="inline-flex items-center font-body text-xs font-medium tracking-[0.14em] uppercase text-fg-subtle mb-12">
          Begin · A Conversation
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-12 lg:gap-20 items-start">
          <div>
            <h2 className="font-display font-light text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] tracking-[-0.025em] m-0 text-fg text-balance">
              Let&apos;s build
              <br />
              something{" "}
              <em className="italic text-accent">remarkable</em>.
            </h2>
            <p className="font-body text-lg leading-[1.65] text-fg-muted max-w-130 mt-10 mb-14">
              We respond to every qualified inquiry within two working days.
              Brief us by email, by phone, or with a short note on the form.
            </p>
            <a
              href="mailto:mk@ccdesign.dk"
              className="group relative inline-flex items-center gap-3.5 px-7 py-[18px] bg-fg text-fg-inverse border border-fg overflow-hidden font-body text-[13px] font-medium tracking-widest uppercase no-underline cursor-pointer transition-[border-color,transform] duration-240 hover:border-accent active:scale-[0.97] before:content-[''] before:absolute before:inset-0 before:bg-accent before:-translate-x-full before:transition-transform before:duration-380 before:ease-(--ease-out-expo) hover:before:translate-x-0"
            >
              <span className="relative z-1">Start a Conversation</span>
              <span
                aria-hidden="true"
                className="relative z-1 inline-block transition-transform duration-280 ease-(--ease-out-quart) group-hover:translate-x-1.5"
              >
                →
              </span>
            </a>
          </div>

          <aside
            className="border-t pt-10 lg:border-t-0 lg:border-l lg:border-fg/15 lg:pl-12 lg:pt-0 border-fg/15 transition-[opacity,transform] duration-800 ease-(--ease-out-expo)"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(20px)",
            }}
          >
            <div className="font-body text-xs font-medium tracking-[0.12em] uppercase text-fg-subtle mb-2">
              Principal · Direct line
            </div>
            <div className="font-display font-normal text-[clamp(1.4rem,2.2vw,1.75rem)] text-fg mb-9 tracking-[-0.01em]">
              Maria Kesby Christiansen
            </div>

            <ul className="list-none p-0 m-0 grid gap-[22px]">
              {ITEMS.map((item) => (
                <li
                  key={item.l}
                  className="grid grid-cols-[60px_1fr] items-baseline gap-4"
                >
                  <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-fg-subtle">
                    {item.l}
                  </span>
                  {item.h ? (
                    <a
                      href={item.h}
                      className="font-body text-base text-fg no-underline border-b border-fg/15 pb-0.5 transition-[color,border-color] duration-240 hover:text-accent hover:border-accent"
                    >
                      {item.v}
                    </a>
                  ) : (
                    <span className="font-body text-[15px] text-fg leading-[1.5]">
                      {item.v}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
