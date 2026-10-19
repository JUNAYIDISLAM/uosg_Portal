import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { aboutPoints } from "@/content/site";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-mist py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2
            id="about-title"
            className="max-w-md font-heading text-3xl font-extrabold text-navy-800 uppercase sm:text-4xl"
          >
            Scouting for a stronger tomorrow
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-body">
            United Open Scout Group is a team of passionate scouts, leaders and volunteers
            dedicated to building responsible, confident and caring citizens.
          </p>
          <ul className="mt-7 space-y-3">
            {aboutPoints.map((point) => (
              <li key={point} className="flex items-center gap-3 text-ink">
                <CircleCheck className="size-5 shrink-0 text-brand-600" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative pb-12 pr-4 sm:pr-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-4 border-white shadow-xl">
            <Image
              src="/images/camp.jpg"
              alt="Scouts sitting together at a forest campsite"
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute right-0 bottom-0 aspect-[4/3] w-[56%] overflow-hidden rounded-2xl border-4 border-white shadow-xl">
            <Image
              src="/images/campfire-tall.jpg"
              alt="Rovers gathered around a campfire at night"
              fill
              sizes="(min-width: 1024px) 300px, 56vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
