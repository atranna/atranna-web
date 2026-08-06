"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

function redirectToLogin() {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [router]);
}
export default function Home() {
  redirectToLogin();
  return null;
}
