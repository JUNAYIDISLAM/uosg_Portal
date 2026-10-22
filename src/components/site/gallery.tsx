import Image from "next/image";
import { Play } from "lucide-react";
import { gallery } from "@/content/site";
import { SectionHeading } from "./section-heading";

export function Gallery() {
  const [feature, ...rest] = gallery;

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-mist py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="gallery-title" title="Moments from the trail" />

        {/* Large photo on the left, square tiles around it; the video fills the last two cells */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <div className="group relative col-span-2 aspect-[4/3] overflow-hidden rounded-xl lg:row-span-2 lg:aspect-square">
            <Image
              src={feature.src}
              alt={feature.alt}
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              quality={90}
              className={`object-cover transition-transform duration-500 group-hover:scale-105 ${feature.position ?? ""}`}
            />
          </div>

          {rest.map((item) =>
            item.video ? (
              <a
                key={item.src}
                href={item.video.url}
                className="group relative col-span-2 aspect-[16/9] overflow-hidden rounded-xl lg:aspect-auto"
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className="object-cover"
                />
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-navy-900/55 text-white transition-colors group-hover:bg-navy-900/45">
                  <span className="flex size-11 items-center justify-center rounded-full bg-white text-navy-900">
                    <Play className="size-5 translate-x-px fill-current" aria-hidden="true" />
                  </span>
                  <span className="px-3 text-center text-sm font-semibold">{item.video.title}</span>
                </span>
              </a>
            ) : (
              <div key={item.src} className="group relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 300px, 50vw"
                  quality={90}
                  className={`object-cover transition-transform duration-500 group-hover:scale-105 ${item.position ?? ""}`}
                />
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
