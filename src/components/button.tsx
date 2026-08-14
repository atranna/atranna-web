export function Button({
  children,
  primary = false,
  onClick,
  type = "button",
  disabled = false,
  fullWidth = false,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  primary?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={
        "rounded-lg flex items-center gap-2 hover:bg-latte-surface-0 dark:hover:bg-mocha-surface-0 active:bg-latte-surface-1 dark:active:bg-mocha-surface-1 px-3 py-2 border cursor-pointer hover:underline disabled:cursor-not-allowed disabled:opacity-70" +
        (primary
          ? " border-latte-mauve dark:border-mocha-mauve text-latte-mauve dark:text-mocha-mauve"
          : "") +
        (!primary
          ? " border-latte-surface-0 dark:border-mocha-surface-0"
          : "") +
        (fullWidth ? " w-full" : "") +
        (className ? ` ${className}` : "")
      }
    >
      {children}
    </button>
  );
}
