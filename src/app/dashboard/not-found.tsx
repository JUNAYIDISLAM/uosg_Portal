import Link from "next/link";
import { Card, DashboardPage } from "@/components/dashboard/page-header";
import { buttonClass } from "@/components/ui/button";

export default function DashboardNotFound() {
  return (
    <DashboardPage>
      <Card className="py-16 text-center">
        <h1 className="font-heading text-2xl font-bold text-ink">Page not available</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-body">
          This page doesn’t exist, or your role doesn’t have access to it.
        </p>
        <Link href="/dashboard" className={buttonClass("primary", "md", "mt-6")}>
          Back to overview
        </Link>
      </Card>
    </DashboardPage>
  );
}
