"use client";

import { login } from "@/api/auth";
import { usersMe } from "@/api/users";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginResponse, setLoginResponse] = useState("");

  async function sendLoginRequest() {
    await login(username, password);
    const userData = await usersMe();
    setLoginResponse(`Successfully logged in as: ${userData.username}`);
  }

  return (
    <>
      <h1>Login</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={sendLoginRequest}>Login</button>

      <p>{loginResponse}</p>
    </>
  );
}
