"use client";

import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginResponse, setLoginResponse] = useState("");

  async function sendLoginRequest() {
    const loginEndpoint = "http://localhost:8080/api/v1/auth/login";

    const response = await fetch(loginEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      setLoginResponse("Login failed: " + response.statusText);
      return;
    }

    const data = await response.json();
    localStorage.setItem("jwtToken", data.token);

    // Test the token by making request to /api/v1/users/me
    const meResponse = await fetch("http://localhost:8080/api/v1/users/me", {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });

    if (!meResponse.ok) {
      setLoginResponse("Token validation failed: " + meResponse.statusText);
      return;
    }

    const meData = await meResponse.json();

    setLoginResponse(`Successfully logged in as: ${meData.username}`);
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
