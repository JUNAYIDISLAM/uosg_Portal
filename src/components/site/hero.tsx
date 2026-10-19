import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonClass } from "@/components/ui/button";

const motto = [
  { word: "Explore", className: "text-brand-800" },
  { word: "Learn", className: "text-navy-800" },
  { word: "Serve", className: "text-[#ff0000]" },
];

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden">
      <Image
        src="/images/hero-group.jpg"
        alt=""
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover object-[center_65%]"
      />
      {/* Lightens the photo so the dark text stays readable */}
      <div className="absolute inset-0 -z-10 bg-white/60" />

      <div className="mx-auto flex min-h-[560px] max-w-5xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:min-h-[640px]">
        {/* Phones: one word per line. Wider screens: one line with dots. */}
        <h1 className="flex flex-col items-center font-heading text-5xl leading-tight font-extrabold sm:flex-row sm:text-6xl lg:text-7xl">
          {motto.map(({ word, className }, i) => (
            <span key={word}>
              {i > 0 && (
                <span className="mx-4 hidden text-navy-800/40 sm:inline" aria-hidden="true">
                  ·
                </span>
              )}
              <span className={className}>{word}</span>
            </span>
          ))}
        </h1>

        <p className="mt-6 max-w-[60rem] text-lg leading-relaxed font-medium text-ink sm:text-xl">
          We are a community of young people guided by Scouting values, building leadership,
          fostering personal growth, and working together to create a stronger society through{" "}
          {/* Large screens: keep the closing words on their own line */}
          <br className="hidden lg:inline" />
          service and teamwork.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/#activities" className={buttonClass("primary", "lg", "w-52")}>
            Explore More
            <ArrowRight className="size-5" strokeWidth={3} aria-hidden="true" />
          </Link>
          <Link href="/#contact" className={buttonClass("ember", "lg", "w-52")}>
            Join With Us
          </Link>
        </div>
      </div>
    </section>
  );
}
