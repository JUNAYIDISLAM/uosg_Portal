import type { Metadata } from "next";
import { Suspense } from "react";
import { Card, CardSkeleton, DashboardPage, PageHeader } from "@/components/dashboard/page-header";
import { ChangePasswordForm } from "@/components/dashboard/member-forms";
import { requireUser } from "@/lib/auth/current-user";
import { roleLabels } from "@/lib/permissions";

export const metadata: Metadata = { title: "Account" };

export default function AccountPage() {
  return (
    <DashboardPage>
      <PageHeader title="Your account" />
      <Suspense fallback={<CardSkeleton className="mt-8 h-80" />}>
        <Account />
      </Suspense>
    </DashboardPage>
  );
}

async function Account() {
  const user = await requireUser();

  return (
    <div className="mt-8 grid items-start gap-6 lg:grid-cols-2">
      <Card>
        <h2 className="mb-4 font-heading text-xl font-bold text-ink">Profile</h2>
        <dl className="divide-y divide-line text-sm">
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-body">Name</dt>
            <dd className="font-medium text-ink">{user.name}</dd>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-body">Email</dt>
            <dd className="font-medium text-ink">{user.email}</dd>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-body">Role</dt>
            <dd className="font-medium text-ink">{roleLabels[user.role]}</dd>
          </div>
        </dl>
        <p className="mt-4 text-xs text-muted">
          To change your name, email or role, ask a Rover Scout Leader or Group Committee member.
        </p>
      </Card>

      <Card>
        <h2 className="mb-5 font-heading text-xl font-bold text-ink">Change password</h2>
        <ChangePasswordForm />
      </Card>
    </div>
  );
}
