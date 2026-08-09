"use client";
import { LogIn } from "lucide-react";
import { login } from "@/api/auth";
import { H1 } from "@/lib/page-components/headings";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/lib/page-components/button";
export default function Login() {
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function sendLoginRequest() {
    const response = await login(username, password);
    if (response.success) {
      localStorage.setItem("jwtToken", response.data.token);
      router.replace("/dashboard");
    } else {
      setLoginErrorMessage(response.error || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-6 border bg-gray-100">
        <div className="text-center mb-6">
          <H1>ATRANNA</H1>
        </div>
        <input
          className="border px-3 py-2 mb-4 w-full hover:bg-gray-300 focus:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border px-3 py-2 mb-4 w-full hover:bg-gray-300 focus:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={sendLoginRequest}>
          <LogIn size={16} />
          Login
        </Button>
        <p>{loginErrorMessage}</p> {/* TODO: Replace with toast notification */}
      </div>
    </div>
  );
}
