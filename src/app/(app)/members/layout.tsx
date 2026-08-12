import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atranna | Members",
  description: "Atranna members",
};

export default function RootLayout({ children }: LayoutProps<"/members">) {
  return children;
}
