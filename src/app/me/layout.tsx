import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Atranna | Me",
  description: "Atranna user profile",
};

export default function RootLayout({ children }: LayoutProps<"/me">) {
  return children;
}
