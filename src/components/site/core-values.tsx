import { HeartHandshake, Tent, Users } from "lucide-react";
import { coreValues } from "@/content/site";
import { SectionHeading } from "./section-heading";

const icons = { users: Users, tent: Tent, heart: HeartHandshake };

export function CoreValues() {
  return (
    <section aria-labelledby="values-title" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="values-title"
          eyebrow="Our core values"
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
                <h3 className="mt-5 font-serif text-lg font-bold text-ink">{value.title}</h3>
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
