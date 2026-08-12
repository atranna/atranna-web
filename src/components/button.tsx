export function Button({
  children,
  primary = false,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "flex items-center gap-2 py-2 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 p-5 border cursor-pointer hover:underline" +
        (primary ? " border-mauve text-mauve" : "")
      }
    >
      {children}
    </button>
  );
}
