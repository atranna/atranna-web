import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atranna | Me",
  description: "Atranna user profile",
};

export default function RootLayout({ children }: LayoutProps<"/me">) {
  return children;
}
