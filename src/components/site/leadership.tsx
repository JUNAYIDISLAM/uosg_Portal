import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { committee, type CommitteeMember } from "@/content/site";

function MemberCard({ member, sizes }: { member: CommitteeMember; sizes: string }) {
  return (
    <figure className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-mist">
      {/* Black and white like the rest of the grid; colour comes back on hover */}
      <Image
        src={member.photo}
        alt={member.name}
        fill
        sizes={sizes}
        quality={90}
        className="object-cover object-top grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/85 via-black/40 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 p-5">
        <p className="font-heading text-xl leading-tight font-bold text-white">{member.name}</p>
        <p className="mt-1 text-xs font-medium text-white/80">{member.role}</p>
      </figcaption>
    </figure>
  );
}

/** White pill with the arrow in a coloured circle, as in the call-to-action cards. */
function PillLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-3 rounded-full bg-white py-1.5 pr-5 pl-1.5 text-sm font-semibold text-ink shadow-sm ring-1 ring-line transition-shadow hover:shadow-md"
    >
      <span className="flex size-8 items-center justify-center rounded-full bg-brand-600 text-white">
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-0.5"
          strokeWidth={2.5}
          aria-hidden="true"
        />
      </span>
      {children}
    </Link>
  );
}

export function Leadership() {
  const [president, ...members] = committee.members;

  return (
    <>
      {/* Page banner */}
      <section className="px-3 pt-3 sm:px-4 sm:pt-4">
        <div className="relative isolate mx-auto flex min-h-[340px] max-w-[1400px] items-end overflow-hidden rounded-3xl sm:min-h-[420px]">
          <Image
            src="/images/hero-group.jpg"
            alt=""
            fill
            preload
            sizes="100vw"
            className="-z-20 object-cover object-[center_40%]"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-r from-navy-900/90 via-navy-900/60 to-navy-900/10" />

          <div className="w-full px-6 py-10 sm:px-12 sm:py-14">
            <h1 className="font-heading text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
              Our Leadership
            </h1>
            <p className="mt-4 max-w-md leading-relaxed text-white/85">
              The Group Committee guides our programme, our members and every step of our journey
              together.
            </p>
          </div>
        </div>
      </section>

      {/* Committee */}
      <section
        aria-labelledby="leadership-title"
        className="relative isolate overflow-hidden py-20 lg:py-28"
      >
        {/* Soft colour blobs behind the heading */}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-96">
          <div className="absolute top-10 left-[15%] size-80 rounded-full bg-violet-600/15 blur-3xl" />
          <div className="absolute top-0 right-[15%] size-80 rounded-full bg-brand-600/15 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_2fr]">
            <p className="inline-flex w-fit items-center gap-2 rounded-md bg-white px-3 py-1.5 text-xs font-medium text-ink shadow-sm ring-1 ring-line">
              <span className="size-1.5 rounded-full bg-brand-600" aria-hidden="true" />
              Group Committee · {committee.term}
            </p>
            <h2
              id="leadership-title"
              className="font-heading text-4xl leading-tight font-bold text-navy-800 sm:text-5xl"
            >
              Meet the
              <br />
              leadership team
            </h2>
          </div>

          {/* President on top, the rest of the committee below */}
          <div className="mx-auto mt-14 w-full max-w-[270px]">
            <MemberCard member={president} sizes="270px" />
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {members.map((member) => (
              <li key={member.name}>
                <MemberCard
                  member={member}
                  sizes="(min-width: 1024px) 270px, (min-width: 640px) 45vw, 50vw"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Calls to action */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="relative isolate flex min-h-72 overflow-hidden rounded-3xl bg-brand-700">
            {/* Photo fills the right half and fades into the green on its left edge */}
            <div className="absolute inset-y-0 right-0 -z-20 w-1/2">
              <Image
                src="/images/gallery/trail-trio.jpg"
                alt=""
                fill
                sizes="(min-width: 768px) 280px, 50vw"
                quality={90}
                className="object-cover object-[center_75%]"
              />
            </div>
            <div className="absolute inset-0 -z-10 bg-linear-to-r from-brand-700 from-50% to-brand-700/0" />
            <div className="max-w-[60%] self-center p-8 lg:p-10">
              <p className="flex items-center gap-2 text-xs font-medium text-white/80">
                <span className="size-1.5 rounded-full bg-white/80" aria-hidden="true" />
                Join our group
              </p>
              <h2 className="mt-3 font-heading text-2xl leading-snug font-bold text-white lg:text-3xl">
                Start your scouting journey with us
              </h2>
              <div className="mt-6">
                <PillLink href="/#contact">Join now</PillLink>
              </div>
            </div>
          </div>

          <div className="relative isolate flex min-h-72 overflow-hidden rounded-3xl bg-white ring-1 ring-line">
            <div aria-hidden="true" className="absolute inset-0 -z-10">
              <div className="absolute -right-10 -bottom-16 size-72 rounded-full bg-violet-600/20 blur-3xl" />
              <div className="absolute top-6 right-16 size-40 rounded-full bg-brand-600/20 blur-2xl" />
              <div className="absolute right-40 bottom-0 size-32 rounded-full bg-ember-500/15 blur-2xl" />
            </div>
            <div className="max-w-[65%] self-center p-8 lg:p-10">
              <p className="flex items-center gap-2 text-xs font-medium text-body">
                <span className="size-1.5 rounded-full bg-brand-600" aria-hidden="true" />
                Let&apos;s work together
              </p>
              <h2 className="mt-3 font-heading text-2xl leading-snug font-bold text-ink lg:text-3xl">
                Want to partner with us or invite us to an event?
              </h2>
              <div className="mt-6">
                <PillLink href="/#contact">Contact us</PillLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
