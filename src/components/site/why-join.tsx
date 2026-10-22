"use client";

import { useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { whyJoin } from "@/content/site";
import { CampfireFriendsIcon, MentorIcon, OpenDoorIcon, PitchTentIcon } from "./people-icons";

const icons = {
  open: OpenDoorIcon,
  tent: PitchTentIcon,
  leaders: MentorIcon,
  friends: CampfireFriendsIcon,
};

// Same four brand colours as the header strip
const accents = [
  "bg-brand-600/10 text-brand-600",
  "bg-violet-600/10 text-violet-600",
  "bg-navy-800/10 text-navy-800",
  "bg-ember-500/10 text-ember-500",
];

export function WhyJoin() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(0);
  const reason = whyJoin[selected];
  const SelectedIcon = icons[reason.icon];

  function open(index: number) {
    setSelected(index);
    dialog.current?.showModal();
  }

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2">
        {whyJoin.map((item, i) => {
          const Icon = icons[item.icon];
          return (
            <li
              key={item.title}
              className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-line transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex size-14 shrink-0 items-center justify-center rounded-xl ${accents[i % accents.length]}`}
                >
                  <Icon className="size-9" />
                </span>
                <h3 className="font-heading leading-snug font-bold text-ink">{item.title}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-body">{item.text}</p>
              <div className="mt-auto pt-4">
                <button
                  type="button"
                  onClick={() => open(i)}
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
                >
                  Read more<span className="sr-only"> about {item.title}</span>
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Native dialog: Esc closes it, and a click on the dimmed backdrop closes it too */}
      <dialog
        ref={dialog}
        aria-labelledby="why-join-title"
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl bg-white p-0 shadow-2xl backdrop:bg-navy-900/50 backdrop:backdrop-blur-sm"
      >
        <div className="relative p-7 sm:p-8">
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label="Close"
            className="absolute top-5 right-5 flex size-9 items-center justify-center rounded-full bg-mist text-ink hover:bg-line"
          >
            <X className="size-4" strokeWidth={2.5} />
          </button>
          <span
            className={`flex size-16 items-center justify-center rounded-xl ${accents[selected % accents.length]}`}
          >
            <SelectedIcon className="size-10" />
          </span>
          <h3 id="why-join-title" className="mt-5 font-heading text-2xl font-bold text-ink">
            {reason.title}
          </h3>
          <p className="mt-3 leading-relaxed text-body">{reason.details}</p>
        </div>
      </dialog>
    </>
  );
}
