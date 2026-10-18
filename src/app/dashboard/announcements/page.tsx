import type { Metadata } from "next";
import { Suspense } from "react";
import { ComingSoon } from "@/components/dashboard/coming-soon";
import { DashboardPage, PageHeader } from "@/components/dashboard/page-header";
import { requirePermission } from "@/lib/auth/current-user";

export const metadata: Metadata = { title: "Announcements" };

export default function AnnouncementsPage() {
  return (
    <DashboardPage>
      <Suspense>
        <Content />
      </Suspense>
    </DashboardPage>
  );
}

async function Content() {
  await requirePermission("announcements.manage");
  return (
    <>
      <PageHeader
        title="Announcements"
        description="Published items appear in “Latest news” on the public website."
      />
      <ComingSoon title="Announcements manager">
        Publish news with a cover photo straight to the public website.
      </ComingSoon>
    </>
  );
}
