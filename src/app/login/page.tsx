import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "@/components/auth/login-form";
import { getCurrentUser } from "@/lib/auth/current-user";
import { db } from "@/lib/db";
import { can } from "@/lib/permissions";

export const metadata: Metadata = { title: "Member login" };

const notices: Record<string, string> = {
  "no-access": "Your account doesn't have access to the dashboard.",
};

export default function LoginPage({ searchParams }: PageProps<"/login">) {
  return (
    <AuthLayout>
      <h1 className="font-serif text-3xl font-bold text-ink">Member login</h1>
      <p className="mt-3 text-body">
        Sign in to manage letters, announcements and group documents.
      </p>
      <div className="mt-8">
        <Suspense fallback={<div className="h-72 animate-pulse rounded-xl bg-mist" />}>
          <LoginSection searchParams={searchParams} />
        </Suspense>
      </div>
    </AuthLayout>
  );
}

async function LoginSection({ searchParams }: Pick<PageProps<"/login">, "searchParams">) {
  const user = await getCurrentUser();
  if (user && can(user.role, "dashboard.access")) redirect("/dashboard");

  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : undefined;
  const error = typeof params.error === "string" ? notices[params.error] : undefined;

  const needsSetup = (await db.user.count()) === 0;

  return (
    <>
      {needsSetup && (
        <p className="mb-5 rounded-lg bg-brand-50 px-3.5 py-3 text-sm text-brand-800">
          No accounts exist yet.{" "}
          <Link href="/setup" className="font-semibold underline">
            Create the first admin account
          </Link>
          .
        </p>
      )}
      <LoginForm next={next} notice={error} />
    </>
  );
}
