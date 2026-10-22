"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
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
          // Bottom padding leaves room for the card hover shadow inside the scroll area
          className="mt-12 flex snap-x snap-mandatory gap-8 overflow-x-auto pb-6 [scrollbar-width:none]"
        >
          {items.map((item) => (
            <li
              key={item.title}
              className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-1rem)] lg:w-[calc((100%-4rem)/3)]"
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-line transition-shadow duration-300 hover:shadow-lg">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 85vw"
                    quality={90}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <time
                    dateTime={item.date}
                    className="flex items-center gap-1.5 text-xs font-medium text-muted"
                  >
                    <CalendarDays className="size-3.5" aria-hidden="true" />
                    {formatDate(item.date)}
                  </time>
                  <h3 className="mt-2 font-heading text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{item.summary}</p>
                  {/* No article pages yet; links go nowhere for now */}
                  <div className="mt-auto pt-4">
                    <Link
                      href="#"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
                    >
                      Read more<span className="sr-only"> about {item.title}</span>
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-1"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
