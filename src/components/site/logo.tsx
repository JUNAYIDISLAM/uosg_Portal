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

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="UOSG home">
      <LogoMark />
      <span className="font-serif text-2xl font-bold text-brand-800">UOSG</span>
    </Link>
  );
}
