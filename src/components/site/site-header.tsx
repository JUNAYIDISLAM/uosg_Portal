"use client";

import Link from "next/link";
import { useState } from "react";
import { Lock, Menu, X } from "lucide-react";
import { navLinks } from "@/content/site";
import { buttonClass } from "@/components/ui/button";
import { Logo } from "./logo";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      {/* Brand colour strip */}
      <div className="flex h-1" aria-hidden="true">
        <span className="w-[37%] bg-brand-600" />
        <span className="w-[25%] bg-violet-600" />
        <span className="w-[25%] bg-navy-800" />
        <span className="flex-1 bg-ember-500" />
      </div>

      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-24 lg:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[15px] font-semibold text-navy-800">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="decoration-2 underline-offset-[6px] hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* On phones the login link lives in the menu instead. */}
          <div className="hidden sm:block">
            <Link href="/login" className={buttonClass("primary")}>
              <Lock className="size-4" aria-hidden="true" />
              Member Login
            </Link>
          </div>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg text-ink hover:bg-mist lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-white lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-2.5 text-[15px] font-semibold text-navy-800 hover:bg-mist"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 sm:hidden">
              <Link href="/login" className={buttonClass("primary", "md", "w-full")}>
                <Lock className="size-4" aria-hidden="true" />
                Member Login
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
