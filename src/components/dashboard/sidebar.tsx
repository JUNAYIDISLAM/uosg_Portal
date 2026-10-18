"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  CircleUser,
  FileText,
  Globe,
  LayoutGrid,
  LogOut,
  Mail,
  Megaphone,
  Menu,
  Users,
  X,
} from "lucide-react";
import { logout } from "@/app/actions/auth";
import { LogoMark } from "@/components/site/logo";

const icons = {
  overview: LayoutGrid,
  letters: FileText,
  announcements: Megaphone,
  messages: Mail,
  members: Users,
  account: CircleUser,
};

export type NavItem = {
  href: string;
  label: string;
  icon: keyof typeof icons;
  badge?: number;
};

type Props = {
  items: NavItem[];
  user: { name: string; roleLabel: string };
};

function isActive(pathname: string, href: string) {
  return href === "/dashboard" ? pathname === href : pathname.startsWith(href);
}

export function Sidebar({ items, user }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = (
    <nav aria-label="Dashboard" className="flex flex-1 flex-col">
      <ul className="space-y-1 px-3">
        {items.map((item) => {
          const Icon = icons[item.icon];
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active ? "bg-brand-600 text-white" : "text-body hover:bg-mist hover:text-ink"
                }`}
              >
                <Icon className="size-[18px]" aria-hidden="true" />
                <span className="flex-1">{item.label}</span>
                {!!item.badge && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      active ? "bg-white/20 text-white" : "bg-ember-500 text-white"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
        <li>
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-body transition-colors hover:bg-mist hover:text-ink"
          >
            <Globe className="size-[18px]" aria-hidden="true" />
            View website
          </Link>
        </li>
      </ul>

      <div className="mt-auto border-t border-line px-3 pt-4 pb-5">
        <Link
          href="/dashboard/account"
          onClick={() => setOpen(false)}
          className={`block rounded-lg px-3 py-2 transition-colors ${
            isActive(pathname, "/dashboard/account") ? "bg-mist" : "hover:bg-mist"
          }`}
        >
          <p className="truncate text-sm font-semibold text-ink">{user.name}</p>
          <p className="truncate text-xs text-muted">{user.roleLabel}</p>
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-body transition-colors hover:bg-mist hover:text-ink"
          >
            <LogOut className="size-[18px]" aria-hidden="true" />
            Sign out
          </button>
        </form>
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-line bg-white px-4 lg:hidden">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <LogoMark size={32} />
          <span className="font-serif text-xl font-bold text-brand-800">UOSG</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="dashboard-drawer"
          className="flex size-10 items-center justify-center rounded-lg text-ink hover:bg-mist"
        >
          <Menu className="size-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" id="dashboard-drawer">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-ink/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-white pt-4">
            <div className="mb-4 flex items-center justify-between px-5">
              <span className="flex items-center gap-2.5">
                <LogoMark size={32} />
                <span className="font-serif text-xl font-bold text-brand-800">UOSG</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex size-9 items-center justify-center rounded-lg hover:bg-mist"
              >
                <X className="size-5" />
              </button>
            </div>
            {nav}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-line bg-white pt-6 lg:flex">
        <Link href="/dashboard" className="mb-6 flex items-center gap-3 px-6">
          <LogoMark />
          <span className="font-serif text-2xl font-bold text-brand-800">UOSG</span>
        </Link>
        {nav}
      </aside>
    </>
  );
}
