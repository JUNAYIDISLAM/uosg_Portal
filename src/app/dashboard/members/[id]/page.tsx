import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { deleteMember } from "@/app/actions/members";
import { Card, CardSkeleton, DashboardPage, PageHeader } from "@/components/dashboard/page-header";
import {
  ConfirmButton,
  EditMemberForm,
  ResetPasswordForm,
} from "@/components/dashboard/member-forms";
import { requirePermission } from "@/lib/auth/current-user";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Edit member" };

export default function EditMemberPage({ params }: PageProps<"/dashboard/members/[id]">) {
  return (
    <DashboardPage>
      <Link
        href="/dashboard/members"
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-body hover:text-ink"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        All members
      </Link>
      <Suspense fallback={<CardSkeleton className="h-96" />}>
        <EditMember params={params} />
      </Suspense>
    </DashboardPage>
  );
}

async function EditMember({ params }: Pick<PageProps<"/dashboard/members/[id]">, "params">) {
  const admin = await requirePermission("members.manage");
  const { id } = await params;

  const member = await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      active: true,
      createdAt: true,
      _count: { select: { letters: true } },
    },
  });
  if (!member) notFound();

  const isSelf = member.id === admin.id;
  const remove = deleteMember.bind(null, member.id);

  return (
    <>
      <PageHeader title={member.name} description={`Member since ${formatDate(member.createdAt)}`} />

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <h2 className="mb-5 font-heading text-xl font-bold text-ink">Details & role</h2>
          <EditMemberForm member={member} isSelf={isSelf} />
        </Card>

        <div className="space-y-6">
          <Card>
            <h2 className="mb-1 font-heading text-xl font-bold text-ink">Reset password</h2>
            <p className="mb-5 text-sm text-body">
              Use this if the member forgot their password. They will be signed out everywhere.
            </p>
            <ResetPasswordForm memberId={member.id} />
          </Card>

          {!isSelf && (
            <Card>
              <h2 className="mb-1 font-heading text-xl font-bold text-ink">Remove member</h2>
              <p className="mb-5 text-sm text-body">
                {member._count.letters > 0
                  ? "This member has written letters, so their account will be deactivated instead of deleted to keep the letter history."
                  : "Permanently deletes this account."}
              </p>
              <form action={remove}>
                <ConfirmButton
                  message={`Remove ${member.name}? This can't be undone.`}
                  className="inline-flex h-11 items-center rounded-lg border border-ember-500 px-5 text-sm font-semibold text-ember-600 hover:bg-ember-500/10"
                >
                  {member._count.letters > 0 ? "Deactivate member" : "Delete member"}
                </ConfirmButton>
              </form>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
