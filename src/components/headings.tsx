const textMauve = "text-latte-mauve dark:text-mocha-mauve";
const textPink = "text-latte-pink dark:text-mocha-pink";

export function H1({ children }: { children: React.ReactNode }) {
  return <h1 className={"text-2xl font-bold " + textMauve}>{children}</h1>;
}

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-bold">{children}</h2>;
}

export function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-bold">{children}</h3>;
}

export function H4({ children }: { children: React.ReactNode }) {
  return <h4 className="text-md font-bold">{children}</h4>;
}

export function H5({ children }: { children: React.ReactNode }) {
  return <h5 className="text-sm font-bold">{children}</h5>;
}

export function H6({ children }: { children: React.ReactNode }) {
  return <h6 className="text-xs font-bold">{children}</h6>;
}
