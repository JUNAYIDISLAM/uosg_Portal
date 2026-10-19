type Variant = "primary" | "ember" | "outline" | "outline-light" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 focus-visible:outline-brand-600",
  ember: "bg-ember-500 text-white hover:bg-ember-600 focus-visible:outline-ember-500",
  outline:
    "border border-brand-600 text-brand-700 hover:bg-brand-50 focus-visible:outline-brand-600",
  "outline-light": "border border-white/70 text-white hover:bg-white/10 focus-visible:outline-white",
  white: "bg-white text-brand-700 hover:bg-brand-50 focus-visible:outline-white",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm font-semibold",
  md: "h-11 px-5 text-sm font-semibold",
  lg: "h-12 px-6 text-base font-bold",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return [base, variants[variant], sizes[size], extra].filter(Boolean).join(" ");
}
