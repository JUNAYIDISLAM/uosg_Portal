import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Card, CardSkeleton, DashboardPage, PageHeader } from "@/components/dashboard/page-header";
import { AddMemberForm } from "@/components/dashboard/member-forms";
import { requirePermission } from "@/lib/auth/current-user";
import { db } from "@/lib/db";
import { roleLabels, rolesByRank } from "@/lib/permissions";

export const metadata: Metadata = { title: "Members" };

export default function MembersPage() {
  return (
    <DashboardPage>
      <PageHeader
        title="Members"
        description="Add members and choose what they can do in the dashboard."
      />
      <Suspense
        fallback={
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <CardSkeleton className="h-96" />
            <CardSkeleton className="h-96" />
          </div>
        }
      >
        <Members />
      </Suspense>
    </DashboardPage>
  );
}

async function Members() {
  const admin = await requirePermission("members.manage");
  const members = await db.user.findMany({
    select: { id: true, name: true, email: true, role: true, active: true },
    orderBy: { name: "asc" },
  });
  members.sort((a, b) => rolesByRank.indexOf(a.role) - rolesByRank.indexOf(b.role));

  return (
    <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
      <Card className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line text-xs text-muted">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">Member</th>
                <th scope="col" className="px-4 py-3 font-medium">Role</th>
                <th scope="col" className="px-4 py-3 font-medium">Status</th>
                <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {members.map((m) => (
                <tr key={m.id}>
                  <td className="px-6 py-3.5">
                    <p className="font-medium text-ink">
                      {m.name}
                      {m.id === admin.id && <span className="ml-1.5 text-xs text-muted">(you)</span>}
                    </p>
                    <p className="text-xs text-muted">{m.email}</p>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-body">{roleLabels[m.role]}</td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        m.active ? "bg-brand-50 text-brand-700" : "bg-mist text-muted"
                      }`}
                    >
                      {m.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <Link
                      href={`/dashboard/members/${m.id}`}
                      className="font-semibold text-brand-700 hover:underline"
                    >
                      Edit<span className="sr-only"> {m.name}</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 className="mb-5 font-heading text-xl font-bold text-ink">Add member</h2>
        <AddMemberForm />
      </Card>
    </div>
  );
}
