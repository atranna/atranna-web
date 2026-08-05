"use client";

async function sendLoginRequest() {
  const loginEndpoint = "http://localhost:8080/api/v1/auth/login";

  const username = (
    document.querySelector('input[type="text"]') as HTMLInputElement
  ).value;
  const password = (
    document.querySelector('input[type="password"]') as HTMLInputElement
  ).value;

  const response = await fetch(loginEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    document.getElementById("loginResponse")!.textContent =
      "Login failed: " + response.statusText;
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
    document.getElementById("loginResponse")!.textContent =
      "Token validation failed: " + meResponse.statusText;
    return;
  }

  const meData = await meResponse.json();

  document.getElementById("loginResponse")!.textContent =
    "Successfully logged in as: " + meData.username;
}

export default function Login() {
  return (
    <>
      <h1>Login</h1>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button onClick={sendLoginRequest}>Login</button>
      <p id="loginResponse"></p>
    </>
  );
}
