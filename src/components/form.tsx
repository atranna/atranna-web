import type {
  ReactNode,
  InputHTMLAttributes,
  SelectHTMLAttributes,
} from "react";
import { Button } from "./button";
import { Plus } from "lucide-react";

export const inputClass =
  "rounded-lg border border-latte-surface-0 dark:border-mocha-surface-0 px-3 py-2 hover:bg-latte-crust dark:hover:bg-mocha-crust focus:bg-latte-base dark:focus:bg-mocha-base focus:outline-none";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`${inputClass} ${props.className ?? ""}`.trim()}
    />
  );
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`${inputClass} ${props.className ?? ""}`.trim()}
    />
  );
}

export function FormField({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label
      className={`grid gap-2 text-sm font-medium text-latte-text dark:text-mocha-text ${className}`.trim()}
    >
      {label}
      {children}
    </label>
  );
}

export function FormActions({
  buttonIcon = <Plus size={16} />,
  onCancel,
  cancelLabel = "Cancel",
  submitLabel,
  submittingLabel,
  submitting,
  disabled = false,
}: {
  onCancel: () => void;
  cancelLabel?: string;
  submitLabel: string;
  submittingLabel: string;
  submitting: boolean;
  disabled?: boolean;
  buttonIcon?: ReactNode;
}) {
  return (
    <>
      <div className="mt-6 flex justify-end gap-3">
        <Button type="button" onClick={onCancel} disabled={submitting}>
          {cancelLabel}
        </Button>
        <Button primary type="submit" disabled={submitting || disabled}>
          {buttonIcon}
          {submitting ? submittingLabel : submitLabel}
        </Button>
      </div>
    </>
  );
}
