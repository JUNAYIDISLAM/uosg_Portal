import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function PageHeader({ eyebrow, title, description, actions }: Props) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="text-sm text-body">{eyebrow}</p>}
        <h1 className="font-serif text-3xl font-bold text-ink sm:text-4xl">{title}</h1>
        {description && <p className="mt-2 text-body">{description}</p>}
      </div>
      {actions}
    </div>
  );
}

/** Standard padding/width wrapper for dashboard pages. */
export function DashboardPage({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 lg:py-10">{children}</div>;
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-2xl bg-white p-6 ${className}`}>{children}</section>;
}

export function CardSkeleton({ className = "h-48" }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl bg-white ${className}`} />;
}
