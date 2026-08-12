import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

export const inputClass =
  "border border-black px-3 py-2 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black/20";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ""}`.trim()} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputClass} ${props.className ?? ""}`.trim()} />;
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
    <label className={`grid gap-2 text-sm font-medium text-gray-900 ${className}`.trim()}>
      {label}
      {children}
    </label>
  );
}

export function FormActions({
  onCancel,
  cancelLabel = "Cancel",
  submitLabel,
  submittingLabel,
  submitting,
  disabled = false,
  error,
}: {
  onCancel: () => void;
  cancelLabel?: string;
  submitLabel: string;
  submittingLabel: string;
  submitting: boolean;
  disabled?: boolean;
  error: string;
}) {
  return (
    <>
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="border border-black px-4 py-2 hover:bg-gray-300 active:bg-gray-200 cursor-pointer"
        >
          {cancelLabel}
        </button>
        <button
          type="submit"
          disabled={submitting || disabled}
          className="border border-mauve text-mauve bg-gray-200 px-4 py-2 text-black hover:bg-gray-300 active:bg-gray-400 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? submittingLabel : submitLabel}
        </button>
      </div>
      {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
    </>
  );
}
