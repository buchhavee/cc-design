import { CCLogo } from "./CCLogo";

const NAV_LINKS = ["Work", "Services", "Process", "Studio", "Journal", "Contact"];
const SOCIAL_LINKS = ["Instagram", "LinkedIn", "Behance", "Press kit"];

const footerLabel =
  "font-body text-[11px] font-medium tracking-[0.14em] uppercase text-fg-inverse/55 mb-5";
const footerLink =
  "font-body text-sm text-fg-inverse no-underline opacity-85 transition-[color,opacity] duration-240 hover:opacity-100 hover:text-white";
const footerLinkSm =
  "font-body text-[11px] tracking-widest uppercase text-fg-inverse/55 no-underline transition-colors duration-240 hover:text-fg-inverse";

export function Footer() {
  return (
    <footer
      className="bg-bg-muted text-fg-inverse/80 pt-24 pb-10 px-(--gutter)"
    >
      <div className="max-w-(--max-page) mx-auto">
        <div className="flex justify-between items-end flex-wrap gap-10 pb-16 border-b border-white/15">
          <div className="text-fg-inverse/90">
            <CCLogo size={48} color="currentColor" />
          </div>
          <div className="font-display font-light text-[clamp(1.5rem,2.4vw,2rem)] text-fg-inverse tracking-[-0.01em] max-w-140">
            <em className="italic">Design</em> is not decoration.
            <br />
            It is the architecture of meaning.
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 py-16">
          <div>
            <div className={footerLabel}>Studio</div>
            <p className="font-body text-sm leading-[1.65] text-fg-inverse max-w-80 m-0">
              CC Design A/S
              <br />
              Kohaven 15
              <br />
              5300 Kerteminde
              <br />
              Danmark
            </p>
          </div>
          <div>
            <div className={footerLabel}>Navigate</div>
            <ul className="list-none p-0 m-0 grid gap-3">
              {NAV_LINKS.map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className={footerLink}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className={footerLabel}>Direct</div>
            <ul className="list-none p-0 m-0 grid gap-3">
              <li>
                <a href="mailto:mk@ccdesign.dk" className={footerLink}>
                  mk@ccdesign.dk
                </a>
              </li>
              <li>
                <a href="tel:+4526833180" className={footerLink}>
                  +45 26 83 31 80
                </a>
              </li>
              <li>
                <a href="https://www.ccdesign.dk" className={footerLink}>
                  www.ccdesign.dk
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className={footerLabel}>Elsewhere</div>
            <ul className="list-none p-0 m-0 grid gap-3">
              {SOCIAL_LINKS.map((l) => (
                <li key={l}>
                  <a href="#" className={footerLink}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-between items-center pt-8 border-t border-white/15 flex-wrap gap-4">
          <div className="font-mono text-[11px] tracking-[0.08em] text-fg-inverse/55">
            © 2014–2026 CC Design A/S · CVR 36 04 71 22 · All rights reserved
          </div>
          <div className="flex gap-6">
            <a href="#" className={footerLinkSm}>
              Privacy
            </a>
            <a href="#" className={footerLinkSm}>
              Imprint
            </a>
            <a href="#" className={footerLinkSm}>
              EN · DA
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
