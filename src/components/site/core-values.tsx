import { HeartHandshake, Tent, Users } from "lucide-react";
import { coreValues } from "@/content/site";
import { SectionHeading } from "./section-heading";

const icons = { users: Users, tent: Tent, heart: HeartHandshake };

export function CoreValues() {
  return (
    <section
      aria-labelledby="values-title"
      className="relative bg-violet-50 pt-24 pb-20 sm:pt-32 lg:pt-36 lg:pb-24"
    >
      {/* Straight sloped top edge: high on the left, lower on the right */}
      <svg
        className="absolute inset-x-0 top-0 h-12 w-full text-white sm:h-20 lg:h-24"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 0H1440V120Z" fill="currentColor" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="values-title"
          title="More than just an organization"
          subtitle="We empower young people through Scouting to build character, develop skills and create a positive impact in the community."
        />

        <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
          {coreValues.map((value) => {
            const Icon = icons[value.icon];
            return (
              <li key={value.title} className="px-6 text-center">
                <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-heading text-lg font-bold text-ink">{value.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-body">
                  {value.text}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
