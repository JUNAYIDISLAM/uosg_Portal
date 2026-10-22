import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { activities, featuredActivity } from "@/content/site";
import { buttonClass } from "@/components/ui/button";
import { SectionHeading } from "./section-heading";

export function Activities() {
  return (
    <section id="activities" aria-labelledby="activities-title" className="bg-mist py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="activities-title"
          title="Our activities & projects"
          subtitle="From camping to community service, we take action in many ways."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
          <article className="group relative min-h-96 overflow-hidden rounded-2xl shadow-sm md:col-span-2 lg:col-span-1 lg:row-span-2">
            <Image
              src={featuredActivity.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              quality={90}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-8">
              <p className="text-xs font-semibold tracking-wider text-brand-100 uppercase">
                {featuredActivity.label}
              </p>
              <h3 className="mt-2 font-heading text-2xl font-bold sm:text-3xl">
                {featuredActivity.title}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85">
                {featuredActivity.text}
              </p>
              {/* No detail pages yet; links go nowhere for now */}
              <Link href="#" className={buttonClass("white", "sm", "mt-6")}>
                Learn more<span className="sr-only"> about {featuredActivity.title}</span>
                <ArrowRight className="size-4" strokeWidth={2.5} aria-hidden="true" />
              </Link>
            </div>
          </article>

          {activities.map((activity) => (
            <article
              key={activity.title}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={activity.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 290px, (min-width: 768px) 50vw, 100vw"
                  quality={90}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-heading text-lg font-bold text-ink">{activity.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{activity.text}</p>
                <div className="mt-auto pt-4">
                  <Link
                    href="#"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
                  >
                    Learn more<span className="sr-only"> about {activity.title}</span>
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
