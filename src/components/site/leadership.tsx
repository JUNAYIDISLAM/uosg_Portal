import Image from "next/image";
import { committee, type CommitteeMember } from "@/content/site";
import { SectionHeading } from "./section-heading";

function MemberCard({ member, sizes }: { member: CommitteeMember; sizes: string }) {
  return (
    <figure className="text-center">
      <div className="relative aspect-[12/13] overflow-hidden rounded-2xl border-2 border-navy-800 bg-mist">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes={sizes}
          className="object-cover object-top"
        />
      </div>
      <figcaption className="mt-3">
        <p className="text-sm font-bold tracking-wide text-navy-800 uppercase sm:text-base">
          {member.name}
        </p>
        <p className="mt-0.5 text-sm text-body sm:text-base">{member.role}</p>
      </figcaption>
    </figure>
  );
}

export function Leadership() {
  const [president, ...members] = committee.members;

  return (
    <section id="leadership" aria-labelledby="leadership-title" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="leadership-title"
          eyebrow={`Group Committee · ${committee.term}`}
          eyebrowTone="violet"
          title="Our leadership hierarchy"
          as="h1"
        />

        <div className="mx-auto mt-14 w-56 sm:w-64">
          <MemberCard member={president} sizes="256px" />
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-4">
          {members.map((member) => (
            <li key={member.name}>
              <MemberCard
                member={member}
                sizes="(min-width: 1024px) 260px, (min-width: 640px) 33vw, 50vw"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
