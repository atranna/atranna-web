import { H2 } from "./headings";
import { Button } from "./button";

export function SectionHeader({
  title,
  count,
  actionLabel,
  actionIcon,
  onAction,
}: {
  title: string;
  count: number;
  actionLabel: string;
  actionIcon?: React.ReactNode;
  onAction: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <H2>
        {title} &middot; <span>{count}</span>
      </H2>
      <Button onClick={onAction} primary>
        {actionIcon}
        {actionLabel}
      </Button>
    </div>
  );
}
