import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { SetupForm } from "@/components/auth/setup-form";
import { db } from "@/lib/db";

export const metadata: Metadata = { title: "First-time setup" };

export default function SetupPage() {
  return (
    <AuthLayout>
      <h1 className="font-heading text-3xl font-bold text-ink">First-time setup</h1>
      <p className="mt-3 text-body">
        Create the first admin account (Group Committee Member). You can add the other members
        from the dashboard afterwards.
      </p>
      <div className="mt-8">
        <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-mist" />}>
          <SetupGate />
        </Suspense>
      </div>
    </AuthLayout>
  );
}

/** The setup form only exists while the database has no accounts. */
async function SetupGate() {
  await connection(); // always check the database at request time
  if ((await db.user.count()) > 0) redirect("/login");
  return <SetupForm />;
}
