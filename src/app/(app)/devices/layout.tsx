import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atranna | Devices",
  description: "Atranna devices",
};

export default function RootLayout({ children }: LayoutProps<"/devices">) {
  return children;
}
