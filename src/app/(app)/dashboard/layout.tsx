import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atranna | Dashboard",
  description: "Atranna dashboard",
};

export default function RootLayout({ children }: LayoutProps<"/dashboard">) {
  return children;
}
