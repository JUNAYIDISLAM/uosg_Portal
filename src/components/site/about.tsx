import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { aboutPoints } from "@/content/site";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-20 lg:px-8">
        <div>
          <h2
            id="about-title"
            className="max-w-md font-heading text-3xl font-extrabold text-navy-800 uppercase sm:text-4xl"
          >
            Scouting for a stronger tomorrow
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-body">
            United Open Scout Group is a team of passionate scouts, leaders and volunteers
            dedicated to building responsible, confident and caring citizens.
          </p>

          {/* Accordion with native <details>; the shared name keeps one item open at a time */}
          <div className="mt-10 space-y-3">
            {aboutPoints.map((point, i) => (
              // 1px wrapper shows as the border; it turns into the brand gradient on hover
              <div
                key={point.title}
                className="rounded-2xl bg-line p-px transition duration-300 hover:scale-[1.01] hover:bg-linear-to-r hover:from-brand-600 hover:via-violet-600 hover:to-ember-500 hover:shadow-lg"
              >
                <details name="about-points" open={i === 0} className="group rounded-[15px] bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-heading font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    {point.title}
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-mist text-ink transition-colors group-open:bg-navy-800 group-open:text-white">
                      <Plus
                        className="size-4 transition-transform duration-300 group-open:rotate-45"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      />
                    </span>
                  </summary>
                  <p className="-mt-1 max-w-lg px-6 pb-5 text-sm leading-relaxed text-body">
                    {point.text}
                  </p>
                </details>
              </div>
            ))}
          </div>

          <Link
            href="/leadership"
            className="mt-10 inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-800"
          >
            Meet our leaders
            <ArrowRight className="size-4" strokeWidth={2.5} aria-hidden="true" />
          </Link>
        </div>

        {/* Uneven photo collage: one tall photo, two smaller ones set lower */}
        <div className="grid grid-cols-5 gap-3 sm:gap-4">
          <div className="relative col-span-3 aspect-[3/4] overflow-hidden rounded-2xl">
            <Image
              src="/images/cards/team-circle.jpg"
              alt="Young scouts standing in a circle with arms around each other"
              fill
              sizes="(min-width: 1024px) 360px, 60vw"
              quality={90}
              className="object-cover"
            />
          </div>
          <div className="col-span-2 mt-10 flex flex-col gap-3 sm:mt-16 sm:gap-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/images/cards/pioneering.jpg"
                alt="Two scouts building a pioneering structure in the forest"
                fill
                sizes="(min-width: 1024px) 240px, 40vw"
                quality={90}
                className="object-cover object-[center_40%]"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/cards/scarves-knot.jpg"
                alt="Scouts holding their colourful scarves knotted together"
                fill
                sizes="(min-width: 1024px) 240px, 40vw"
                quality={90}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
