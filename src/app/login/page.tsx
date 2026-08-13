"use client";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { login } from "@/api/auth";
import { H1 } from "@/components/headings";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/button";
import { toastError, toastSuccess } from "@/components/toast";
export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function sendLoginRequest() {
    const response = await login(username, password);
    if (response.success) {
      localStorage.setItem("jwtToken", response.data.token);
      toastSuccess("Welcome back");
      router.replace("/dashboard");
    } else {
      toastError(response.error || "Login failed");
    }
  }

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat text-text"
      style={{
        backgroundImage: "url('/taylor-vick-M5tzZtFCOfs-unsplash.jpg')",
      }}
    >
      <div className="absolute inset-0 backdrop-blur-sm bg-base/20" />
      <div className="relative w-full max-w-sm p-6 border border-overlay-0 rounded-lg bg-base text-text">
        <div className="text-center mb-6">
          <H1>ATRANNA</H1>
        </div>
        <input
          className="rounded-lg border border-overlay-0 px-3 py-2 mb-4 w-full hover:bg-gray-200 focus:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="rounded-lg border border-overlay-0 px-3 py-2 mb-4 w-full hover:bg-gray-200 focus:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button primary onClick={sendLoginRequest} fullWidth>
          <LogIn size={16} />
          Login
        </Button>
        <p className="mt-4 text-sm">
          Need an account?{" "}
          <Link href="/register" className="text-mauve hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
