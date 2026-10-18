import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LogoMark } from "@/components/site/logo";

/** Split-screen layout used by the login and setup pages. */
export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative isolate hidden overflow-hidden lg:block">
        <Image
          src="/images/mountain.jpg"
          alt=""
          fill
          preload
          sizes="50vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-brand-700/70" />
        <figure className="absolute inset-x-12 bottom-14 text-white">
          <blockquote className="font-serif text-3xl leading-snug font-bold">
            “Leave this world a little better than you found it.”
          </blockquote>
          <figcaption className="mt-4 text-white/85">— Robert Baden-Powell</figcaption>
        </figure>
      </div>

      <div className="flex flex-col bg-white px-4 py-6 sm:px-10 lg:px-14">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <LogoMark />
            <span className="font-serif text-2xl font-bold text-brand-800">UOSG</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-body hover:text-ink"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to site
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
          {children}
        </div>
      </div>
    </div>
  );
}
