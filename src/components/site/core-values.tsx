import { coreValues } from "@/content/site";
import { HelpingHandsIcon, HikerIcon, LeaderIcon } from "./people-icons";
import { SectionHeading } from "./section-heading";

const icons = { users: LeaderIcon, tent: HikerIcon, heart: HelpingHandsIcon };

// One brand colour per card, same family as the header strip
const accents = [
  { icon: "text-brand-600", tint: "bg-brand-600/10", bar: "bg-brand-600" },
  { icon: "text-violet-600", tint: "bg-violet-600/10", bar: "bg-violet-600" },
  { icon: "text-ember-500", tint: "bg-ember-500/10", bar: "bg-ember-500" },
];

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

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {coreValues.map((value, i) => {
            const Icon = icons[value.icon];
            const accent = accents[i % accents.length];
            return (
              <li
                key={value.title}
                className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-navy-800/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <span
                  className="absolute top-6 right-7 font-heading text-5xl font-extrabold text-navy-800/[0.06]"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`flex size-16 items-center justify-center rounded-2xl ${accent.tint} ${accent.icon}`}
                >
                  <Icon className="size-10" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-heading text-xl font-bold text-ink">{value.title}</h3>
                <p className="mt-3 leading-relaxed text-body">{value.text}</p>
                {/* Colour bar slides in along the bottom edge on hover */}
                <span
                  className={`absolute inset-x-0 bottom-0 h-1.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${accent.bar}`}
                  aria-hidden="true"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
