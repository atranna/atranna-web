import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Atranna | Users",
  description: "Atranna users",
};

export default function RootLayout({ children }: LayoutProps<"/users">) {
  return children;
}
