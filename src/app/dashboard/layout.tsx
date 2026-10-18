import type { Metadata } from "next";
import { Suspense } from "react";
import { Sidebar, type NavItem } from "@/components/dashboard/sidebar";
import { requireUser } from "@/lib/auth/current-user";
import { db } from "@/lib/db";
import { can, roleLabels } from "@/lib/permissions";

export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s · UOSG Dashboard" },
  robots: { index: false },
};

// Every dashboard page depends on the signed-in member, so navigations into it
// wait for the server instead of showing a prefetched shell.
export const instant = false;

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return (
    <div className="min-h-screen bg-mist lg:flex">
      <Suspense fallback={<aside className="hidden w-60 shrink-0 border-r border-line bg-white lg:block" />}>
        <DashboardSidebar />
      </Suspense>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}

async function DashboardSidebar() {
  const user = await requireUser();

  const items: NavItem[] = [
    { href: "/dashboard", label: "Overview", icon: "overview" },
    { href: "/dashboard/letters", label: "Letters", icon: "letters" },
  ];
  if (can(user.role, "announcements.manage")) {
    items.push({ href: "/dashboard/announcements", label: "Announcements", icon: "announcements" });
  }
  if (can(user.role, "messages.read")) {
    const unread = await db.contactMessage.count({ where: { readAt: null } });
    items.push({ href: "/dashboard/messages", label: "Messages", icon: "messages", badge: unread });
  }
  if (can(user.role, "members.manage")) {
    items.push({ href: "/dashboard/members", label: "Members", icon: "members" });
  }

  return <Sidebar items={items} user={{ name: user.name, roleLabel: roleLabels[user.role] }} />;
}
