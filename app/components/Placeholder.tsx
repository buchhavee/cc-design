type Tint = "soft" | "inverse";

type Props = {
  label: string;
  ratio?: string;
  tint?: Tint;
  fill?: boolean;
};

const PALETTE: Record<Tint, { bg: string; stroke: string; fg: string }> = {
  soft: {
    bg: "var(--color-bg-soft)",
    stroke: "rgb(28 28 26 / 0.05)",
    fg: "rgb(28 28 26 / 0.4)",
  },
  inverse: {
    bg: "var(--color-bg-inverse)",
    stroke: "rgb(255 255 255 / 0.05)",
    fg: "rgb(240 238 233 / 0.55)",
  },
};

export function Placeholder({ label, ratio = "4/3", tint = "soft", fill = false }: Props) {
  const { bg, stroke, fg } = PALETTE[tint];
  return (
    <div
      className="relative w-full overflow-hidden flex items-end"
      style={{
        aspectRatio: fill ? undefined : ratio,
        height: fill ? "100%" : undefined,
        background: `repeating-linear-gradient(135deg, ${bg} 0px, ${bg} 14px, ${stroke} 14px, ${stroke} 15px)`,
      }}
    >
      <div
        className="px-5 py-4 font-mono text-[11px] tracking-[0.08em] uppercase"
        style={{ color: fg }}
      >
        {label}
      </div>
    </div>
  );
}
