import type { LetterStatus } from "@/generated/prisma/enums";

const styles: Record<LetterStatus, { label: string; className: string }> = {
  DRAFT: { label: "Draft", className: "bg-mist text-body" },
  IN_REVIEW: { label: "In review", className: "bg-violet-600/10 text-violet-600" },
  CHANGES_REQUESTED: { label: "Changes requested", className: "bg-ember-500/10 text-ember-600" },
  APPROVED: { label: "Approved", className: "bg-brand-50 text-brand-700" },
};

export function StatusBadge({ status }: { status: LetterStatus }) {
  const { label, className } = styles[status];
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}
