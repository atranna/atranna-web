export function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 py-2 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 p-5 border border-black cursor-pointer hover:underline"
    >
      {children}
    </button>
  );
}
