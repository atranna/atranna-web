"use client";

import { login } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Login() {
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function sendLoginRequest() {
    try {
      const token = await login(username, password);
      localStorage.setItem("jwtToken", token);
      router.replace("/dashboard");
    } catch (error) {
      setLoginErrorMessage(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-6 border border-gray-300 rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">Atranna</h1>

        <input
          className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={sendLoginRequest}
        >
          Login
        </button>
        <p>{loginErrorMessage}</p>
      </div>
    </div>
  );
}
