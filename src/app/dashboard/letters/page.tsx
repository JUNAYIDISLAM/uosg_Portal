import type { Metadata } from "next";
import { Suspense } from "react";
import { ComingSoon } from "@/components/dashboard/coming-soon";
import { DashboardPage, PageHeader } from "@/components/dashboard/page-header";
import { requireUser } from "@/lib/auth/current-user";

export const metadata: Metadata = { title: "Letters" };

export default function LettersPage() {
  return (
    <DashboardPage>
      <PageHeader title="Letters" description="Draft, review and export official group letters." />
      <Suspense>
        <Guard />
      </Suspense>
      <ComingSoon title="Letter Builder">
        Write letters on the official letterhead, save drafts, submit them for review and export
        approved letters as PDF.
      </ComingSoon>
    </DashboardPage>
  );
}

async function Guard() {
  await requireUser();
  return null;
}
