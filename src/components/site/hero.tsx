import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonClass } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="home" className="bg-mist">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          <p className="text-sm font-semibold text-brand-600">Explore · Learn · Serve</p>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.08] text-brand-800 sm:text-5xl lg:text-6xl">
            United Open Scout Group
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-body">
            We are a community of young people guided by Scouting values, working together for
            personal growth, leadership and a stronger society.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/#activities" className={buttonClass("primary")}>
              Explore our activities
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/#contact" className={buttonClass("ember")}>
              Join our group
            </Link>
          </div>
        </div>

        {/* Green frame offset to the bottom-left, as in the design */}
        <div className="rounded-[28px_24px_24px_96px] bg-brand-600 pb-2.5 pl-2.5 shadow-2xl shadow-brand-900/20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[24px_24px_24px_90px]">
            <Image
              src="/images/hero.jpg"
              alt="Members of United Open Scout Group in uniform"
              fill
              preload
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
