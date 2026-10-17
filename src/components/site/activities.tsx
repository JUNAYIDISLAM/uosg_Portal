import Image from "next/image";
import { activities, featuredActivity } from "@/content/site";
import { SectionHeading } from "./section-heading";

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute top-4 right-4 rounded-full border-2 border-white bg-black/30 px-3 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
      {children}
    </span>
  );
}

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
          <article className="relative min-h-96 overflow-hidden rounded-2xl md:col-span-2 lg:col-span-1 lg:row-span-2">
            <Image
              src={featuredActivity.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />
            <Tag>{featuredActivity.tag}</Tag>
            <div className="absolute inset-x-0 bottom-0 p-7 text-white">
              <p className="text-sm font-medium text-white/80">{featuredActivity.label}</p>
              <h3 className="mt-1 font-serif text-2xl font-bold">{featuredActivity.title}</h3>
              <p className="mt-2 text-sm text-white/85">{featuredActivity.text}</p>
            </div>
          </article>

          {activities.map((activity) => (
            <article key={activity.title} className="overflow-hidden rounded-2xl bg-white">
              <div className="relative aspect-[16/10]">
                <Image
                  src={activity.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 290px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <Tag>{activity.tag}</Tag>
              </div>
              <div className="p-5">
                <h3 className="font-serif font-bold text-ink">{activity.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{activity.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
