import { HeartHandshake, Tent, Trophy, Users } from "lucide-react";
import { stats, type Stat } from "@/content/site";
import { SectionHeading } from "./section-heading";

const icons: Record<Stat["icon"], typeof Users> = {
  members: Users,
  camps: Tent,
  service: HeartHandshake,
  achievements: Trophy,
};

// Same four colours as the strip at the top of the site header.
const colors: Record<Stat["color"], { icon: string; bar: string }> = {
  green: { icon: "text-brand-600", bar: "bg-brand-600" },
  violet: { icon: "text-violet-600", bar: "bg-violet-600" },
  navy: { icon: "text-navy-800", bar: "bg-navy-800" },
  red: { icon: "text-ember-500", bar: "bg-ember-500" },
};

export function Stats() {
  return (
    <section aria-labelledby="stats-title" className="bg-white pt-20 pb-8 lg:pt-24 lg:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="stats-title"
          title="Numbers that tell our story"
          subtitle="Through collective effort and dedication, we continue to grow and make a difference."
        />

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = icons[stat.icon];
            return (
              <div key={stat.label} className="flex flex-col items-center px-2 text-center lg:px-8">
                <Icon
                  className={`size-14 sm:size-16 ${colors[stat.color].icon}`}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                {/* Label comes first for screen readers; shown under the number */}
                <dt className="order-3 mt-2 text-sm font-medium text-body sm:text-base">
                  {stat.label}
                </dt>
                <dd className="order-2 mt-6 font-heading text-4xl font-extrabold text-ink sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            );
          })}
        </dl>

        {/* Colour strip: one segment per number above */}
        <div className="mt-14 grid grid-cols-4" aria-hidden="true">
          {stats.map((stat) => (
            <span key={stat.label} className={`h-1.5 ${colors[stat.color].bar}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
