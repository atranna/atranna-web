"use client";

import { usersMe } from "@/api/users";
import { useState, useEffect } from "react";

export default function Me() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [displayname, setDisplayname] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      const userData = await usersMe();
      setUsername(userData.username);
      setEmail(userData.email);
      setDisplayname(userData.displayname);
    }
    fetchUserData();
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <h1 className="text-2xl font-bold mb-4">Me</h1>

        <ul>
          <li>Username: {username || "N/A"}</li>
          <li>Email: {email || "N/A"}</li>
          <li>Display Name: {displayname || "N/A"}</li>
        </ul>
      </div>
    </div>
  );
}
