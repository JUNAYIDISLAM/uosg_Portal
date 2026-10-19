"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { NewsItem } from "@/content/site";
import { formatDate } from "@/lib/format";

export function News({ items }: { items: NewsItem[] }) {
  const track = useRef<HTMLUListElement>(null);

  function scroll(direction: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 32 : el.clientWidth;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  return (
    <section id="news" aria-labelledby="news-title" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-6">
          <div className="max-w-xl">
            <h2
              id="news-title"
              className="font-heading text-3xl font-extrabold text-navy-800 uppercase sm:text-4xl"
            >
              Latest news &amp; announcements
            </h2>
            <p className="mt-4 leading-relaxed text-body">
              Read about our recent activities, upcoming events and inspiring stories from our
              rovers.
            </p>
          </div>
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Previous news"
              className="flex size-9 items-center justify-center rounded-full border border-line text-muted hover:border-ink hover:text-ink"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Next news"
              className="flex size-9 items-center justify-center rounded-full border border-line text-ink hover:border-ink"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <ul
          ref={track}
          className="mt-12 flex snap-x snap-mandatory gap-8 overflow-x-auto pb-2 [scrollbar-width:none]"
        >
          {items.map((item) => (
            <li
              key={item.title}
              className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-1rem)] lg:w-[calc((100%-4rem)/3)]"
            >
              <article>
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 85vw"
                    className="object-cover"
                  />
                  <span className="absolute top-3 right-3 rounded-full border-2 border-white bg-black/30 px-3 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
                    {item.tag}
                  </span>
                </div>
                <time dateTime={item.date} className="mt-4 block text-xs text-muted">
                  {formatDate(item.date)}
                </time>
                <h3 className="mt-1 font-heading text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{item.summary}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
