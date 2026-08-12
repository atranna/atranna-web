import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atranna | Login",
  description: "Atranna login page",
};

export default function RootLayout({ children }: LayoutProps<"/login">) {
  return children;
}
