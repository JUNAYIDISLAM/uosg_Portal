import Image from "next/image";
import Link from "next/link";

export function LogoMark({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src="/images/logo.png"
      alt=""
      width={size}
      height={size}
      className={`rounded-full ${className}`}
    />
  );
}

// "UNITED" sizes are measured so both lines end at the same right edge.
const textSizes = {
  sm: ["text-[20.4px]", "text-[10px]"],
  md: ["text-[24.5px]", "text-xs"],
  lg: ["text-[24.5px] lg:text-[26.5px]", "text-xs lg:text-[13px]"],
};

/** Group name shown next to the logo: "United" on top, "Open Scout Group" below. */
export function LogoText({ size = "md" }: { size?: keyof typeof textSizes }) {
  const [top, bottom] = textSizes[size];
  return (
    <span className="flex flex-col whitespace-nowrap text-brand-800">
      <span className={`font-heading leading-none font-black tracking-wider uppercase [-webkit-text-stroke:1px_currentColor] [paint-order:stroke_fill] ${top}`}>
        United
      </span>
      <span
        className={`mt-0.5 leading-tight font-medium tracking-tight text-navy-800 [word-spacing:-0.08em] ${bottom}`}
      >
        Open Scout Group
      </span>
    </span>
  );
}

/** Logo used in the website header. */
export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="United Open Scout Group home">
      <LogoMark size={56} className="size-11 lg:size-14" />
      <LogoText size="lg" />
    </Link>
  );
}
