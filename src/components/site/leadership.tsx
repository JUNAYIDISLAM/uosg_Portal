import { Users } from "lucide-react";
import {
  leadershipSession,
  leadershipTiers,
  roverCount,
  type AvatarTone,
  type Leader,
} from "@/content/site";
import { SectionHeading } from "./section-heading";

const avatarTones: Record<AvatarTone, string> = {
  navy: "bg-navy-800",
  green: "bg-brand-600",
  violet: "bg-violet-600",
  ember: "bg-ember-500",
};

function initials(name: string) {
  return name
    .replace(/^Md\.\s*/i, "")
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function LeaderCard({ leader, tone }: { leader: Leader; tone: AvatarTone }) {
  return (
    <li className="flex items-center gap-3 rounded-xl border border-line bg-white px-3.5 py-4">
      <span
        className={`flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${avatarTones[tone]}`}
        aria-hidden="true"
      >
        {initials(leader.name)}
      </span>
      <div className="min-w-0">
        <p className="font-semibold text-ink">{leader.name}</p>
        <p className="text-xs leading-snug text-body">{leader.role}</p>
        <p className="mt-0.5 text-xs text-muted">Since {leader.since}</p>
      </div>
    </li>
  );
}

/** Vertical line that links one tier to the next on wide screens. */
function Connector() {
  return (
    <div className="hidden h-10 md:grid md:grid-cols-[200px_1fr] md:gap-8" aria-hidden="true">
      <span />
      <span className="ml-[36%] w-px bg-line" />
    </div>
  );
}

export function Leadership() {
  return (
    <section id="leadership" aria-labelledby="leadership-title" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="leadership-title"
          eyebrow={`Current office bearers · Session ${leadershipSession}`}
          eyebrowTone="violet"
          title="Our leadership hierarchy"
        />

        <div className="mt-16">
          {leadershipTiers.map((tier) => {
            const many = tier.leaders.length > 2;
            const single = tier.leaders.length === 1;
            return (
              <div key={tier.title} className="mb-8 md:mb-0">
                <div className="grid gap-4 md:grid-cols-[200px_1fr] md:gap-8">
                  <div className="md:pt-3 md:text-right">
                    <h3 className="font-heading font-bold text-ink">{tier.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-body">{tier.description}</p>
                  </div>
                  <ul
                    className={`grid gap-3 ${
                      many
                        ? "sm:grid-cols-2 xl:grid-cols-4"
                        : single
                          ? "md:max-w-[45%] md:min-w-80"
                          : "sm:grid-cols-2"
                    }`}
                  >
                    {tier.leaders.map((leader) => (
                      <LeaderCard key={leader.name} leader={leader} tone={tier.tone} />
                    ))}
                  </ul>
                </div>
                <Connector />
              </div>
            );
          })}

          <div className="mt-8 grid gap-4 md:mt-0 md:grid-cols-[200px_1fr] md:gap-8">
            <div className="md:text-right">
              <h3 className="font-heading font-bold text-ink">Rovers</h3>
              <p className="mt-1 text-sm text-body">The heart of the crew.</p>
            </div>
            <p className="flex items-center gap-3 rounded-xl bg-brand-50 px-4 py-4 text-sm text-brand-700 md:max-w-[45%] md:min-w-80">
              <Users className="size-5 text-brand-700" aria-hidden="true" />
              <span className="font-heading text-xl font-bold">{roverCount.active}</span>
              active rovers across {roverCount.units} units
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
