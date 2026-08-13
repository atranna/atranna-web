export function Button({
  children,
  primary = false,
  onClick,
  type = "button",
  disabled = false,
  fullWidth = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  primary?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={
        "flex items-center gap-2 bg-gray-200 px-3 py-2 border cursor-pointer hover:underline hover:bg-surface-0 active:bg-surface-1 disabled:cursor-not-allowed disabled:opacity-70" +
        (primary ? " border-mauve text-mauve" : "") +
        (fullWidth ? " w-full" : "")
      }
    >
      {children}
    </button>
  );
}
