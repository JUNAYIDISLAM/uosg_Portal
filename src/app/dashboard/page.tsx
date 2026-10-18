import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { Card, CardSkeleton, DashboardPage, PageHeader } from "@/components/dashboard/page-header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { requireUser, type CurrentUser } from "@/lib/auth/current-user";
import { db } from "@/lib/db";
import { timeAgo } from "@/lib/format";
import { can } from "@/lib/permissions";

export default function OverviewPage() {
  return (
    <DashboardPage>
      <Suspense fallback={<OverviewSkeleton />}>
        <Overview />
      </Suspense>
    </DashboardPage>
  );
}

function OverviewSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-16 w-72 animate-pulse rounded-lg bg-white" />
      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <CardSkeleton className="h-72" />
        <CardSkeleton className="h-72" />
      </div>
      <CardSkeleton className="h-64" />
    </div>
  );
}

async function Overview() {
  const user = await requireUser();
  const reviewer = can(user.role, "letters.review");

  return (
    <>
      <PageHeader eyebrow="Welcome back," title={user.name} />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        {reviewer ? <AwaitingReview /> : <GettingStarted />}
        <AtAGlance user={user} reviewer={reviewer} />
      </div>

      <RecentActivity user={user} />
    </>
  );
}

async function AwaitingReview() {
  const letters = await db.letter.findMany({
    where: { status: "IN_REVIEW" },
    orderBy: { submittedAt: "asc" },
    take: 5,
    select: { id: true, title: true, submittedAt: true, author: { select: { name: true } } },
  });

  return (
    <Card>
      <h2 className="font-serif text-xl font-bold text-ink">Awaiting your review</h2>
      <p className="mt-1 text-sm text-body">
        Letters submitted by members that need approval before export.
      </p>
      {letters.length === 0 ? (
        <p className="mt-8 text-sm text-muted">Nothing to review right now.</p>
      ) : (
        <ul className="mt-5 divide-y divide-line">
          {letters.map((letter) => (
            <li key={letter.id}>
              <Link
                href={`/dashboard/letters/${letter.id}`}
                className="group flex items-center justify-between gap-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-ink group-hover:text-brand-700">
                    {letter.title}
                  </p>
                  <p className="text-xs text-muted">
                    {letter.author.name}
                    {letter.submittedAt && ` · ${timeAgo(letter.submittedAt)}`}
                  </p>
                </div>
                <ArrowRight className="size-4 shrink-0 text-ink" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function GettingStarted() {
  return (
    <Card>
      <h2 className="font-serif text-xl font-bold text-ink">Getting started</h2>
      <p className="mt-1 text-sm text-body">
        Draft official group letters, then submit them for review. Approved letters can be
        exported as PDF.
      </p>
      <Link
        href="/dashboard/letters"
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:underline"
      >
        Go to letters
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </Card>
  );
}

async function AtAGlance({ user, reviewer }: { user: CurrentUser; reviewer: boolean }) {
  const [yours, drafts, inReview, announcements] = await Promise.all([
    db.letter.count({ where: { authorId: user.id } }),
    db.letter.count({ where: { authorId: user.id, status: "DRAFT" } }),
    db.letter.count({
      where: { status: "IN_REVIEW", ...(reviewer ? {} : { authorId: user.id }) },
    }),
    db.announcement.count({ where: { published: true } }),
  ]);

  const rows = [
    { label: "Your letters", value: yours },
    { label: "Drafts in progress", value: drafts },
    { label: "Awaiting review", value: inReview },
    { label: "Published announcements", value: announcements },
  ];

  return (
    <Card>
      <h2 className="font-serif text-xl font-bold text-ink">At a glance</h2>
      <dl className="mt-3 divide-y divide-line">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between py-3.5">
            <dt className="text-sm text-body">{row.label}</dt>
            <dd className="font-serif text-xl font-bold text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}

async function RecentActivity({ user }: { user: CurrentUser }) {
  const letters = await db.letter.findMany({
    where: can(user.role, "letters.viewAll") ? {} : { authorId: user.id },
    orderBy: { updatedAt: "desc" },
    take: 5,
    select: { id: true, title: true, reference: true, status: true },
  });

  return (
    <Card className="mt-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl font-bold text-ink">Recent activity</h2>
        <Link href="/dashboard/letters" className="text-sm font-semibold text-brand-700 hover:underline">
          All letters
        </Link>
      </div>
      {letters.length === 0 ? (
        <p className="mt-6 text-sm text-muted">No letters yet.</p>
      ) : (
        <ul className="mt-4 divide-y divide-line">
          {letters.map((letter) => (
            <li key={letter.id} className="flex items-center justify-between gap-4 py-3">
              <div className="min-w-0">
                <p className="truncate font-medium text-ink">{letter.title}</p>
                {letter.reference && <p className="text-xs text-muted">{letter.reference}</p>}
              </div>
              <StatusBadge status={letter.status} />
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
