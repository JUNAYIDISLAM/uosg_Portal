import Image from "next/image";
import Link from "next/link";
import { buttonClass } from "@/components/ui/button";

export function GetInvolved() {
  return (
    <section aria-labelledby="involved-title" className="relative isolate overflow-hidden">
      <Image src="/images/campfire.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-brand-900/85" />

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold text-white/80">Get involved</p>
        <h2
          id="involved-title"
          className="mt-2 max-w-md font-serif text-3xl font-bold text-white sm:text-4xl"
        >
          Be a part of something bigger
        </h2>
        <p className="mt-5 max-w-md leading-relaxed text-white/85">
          Join United Open Scout Group and start your journey of friendship, adventure and
          service.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/#contact" className={buttonClass("ember")}>
            Join now
          </Link>
          <Link href="/#contact" className={buttonClass("outline-light")}>
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
