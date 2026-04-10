import type { JobType } from "../types";

interface JobBadgeProps {
  type: JobType;
  className?: string;
}

const BADGE_CONFIG: Record<JobType, { label: string; cls: string }> = {
  Government: { label: "Government", cls: "badge-govt" },
  Private: { label: "Private", cls: "badge-private" },
  Corporate: { label: "Corporate", cls: "badge-corporate" },
};

export function JobBadge({ type, className = "" }: JobBadgeProps) {
  const { label, cls } = BADGE_CONFIG[type];
  return (
    <span
      className={`${cls} ${className}`}
      data-ocid={`badge-${type.toLowerCase()}`}
    >
      {label}
    </span>
  );
}
