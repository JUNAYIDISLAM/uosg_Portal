type Props = {
  eyebrow?: string;
  eyebrowTone?: "brand" | "violet" | "light";
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
  id?: string;
};

const eyebrowColors = {
  brand: "text-brand-600",
  violet: "text-violet-600",
  light: "text-white/80",
};

export function SectionHeading({
  eyebrow,
  eyebrowTone = "brand",
  title,
  subtitle,
  align = "center",
  tone = "dark",
  id,
}: Props) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      {eyebrow && (
        <p className={`text-sm font-semibold ${eyebrowColors[eyebrowTone]}`}>{eyebrow}</p>
      )}
      <h2
        id={id}
        className={`mt-2 font-heading text-3xl font-bold sm:text-4xl ${
          tone === "light" ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            tone === "light" ? "text-white/85" : "text-body"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
