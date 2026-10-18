import type { Metadata } from "next";
import { Suspense } from "react";
import { deleteMessage, setMessageRead } from "@/app/actions/messages";
import { ConfirmButton } from "@/components/dashboard/member-forms";
import { Card, CardSkeleton, DashboardPage, PageHeader } from "@/components/dashboard/page-header";
import { requirePermission } from "@/lib/auth/current-user";
import { db } from "@/lib/db";
import { timeAgo } from "@/lib/format";

export const metadata: Metadata = { title: "Messages" };

export default function MessagesPage() {
  return (
    <DashboardPage>
      <PageHeader
        title="Messages"
        description="Messages sent through the contact form on the public website."
      />
      <Suspense fallback={<CardSkeleton className="mt-8 h-96" />}>
        <Messages />
      </Suspense>
    </DashboardPage>
  );
}

async function Messages() {
  await requirePermission("messages.read");
  const messages = await db.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  if (messages.length === 0) {
    return (
      <Card className="mt-8 py-14 text-center">
        <p className="text-sm text-muted">No messages yet.</p>
      </Card>
    );
  }

  return (
    <ul className="mt-8 space-y-4">
      {messages.map((m) => (
        <li key={m.id}>
          <Card className={m.readAt ? "" : "ring-2 ring-brand-600/30"}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-ink">
                  {!m.readAt && (
                    <span className="mr-2 rounded-full bg-ember-500 px-2 py-0.5 text-xs font-semibold text-white">
                      New
                    </span>
                  )}
                  {m.name}
                </p>
                <a
                  href={`mailto:${m.email}?subject=${encodeURIComponent("Re: your message to UOSG")}`}
                  className="text-sm text-brand-700 hover:underline"
                >
                  {m.email}
                </a>
              </div>
              <p className="text-xs text-muted">{timeAgo(m.createdAt)}</p>
            </div>
            <p className="mt-4 text-sm leading-relaxed whitespace-pre-line text-body">{m.message}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <form action={setMessageRead.bind(null, m.id, !m.readAt)}>
                <button
                  type="submit"
                  className="text-sm font-semibold text-brand-700 hover:underline"
                >
                  {m.readAt ? "Mark as unread" : "Mark as read"}
                </button>
              </form>
              <form action={deleteMessage.bind(null, m.id)}>
                <ConfirmButton
                  message="Delete this message?"
                  className="text-sm font-semibold text-ember-600 hover:underline"
                >
                  Delete
                </ConfirmButton>
              </form>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}
