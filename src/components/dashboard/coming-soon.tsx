import type { ReactNode } from "react";
import { Card } from "./page-header";

export function ComingSoon({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card className="mt-8 py-14 text-center">
      <p className="text-sm font-semibold text-violet-600">Coming in the next update</p>
      <h2 className="mt-2 font-serif text-xl font-bold text-ink">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-body">{children}</p>
    </Card>
  );
}
