"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usersMe } from "@/api/users";
import type { User } from "@/lib/types";

type CurrentUser = {
  user: User | null;
  username: string;
  displayName: string;
  preferredName: string;
  loading: boolean;
};

const UserContext = createContext<CurrentUser | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    usersMe()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  const username = user?.username ?? "";
  const displayName = user?.display_name ?? "";
  const preferredName = displayName || username || "N/A";

  return (
    <UserContext.Provider
      value={{
        user,
        username,
        displayName,
        preferredName,
        loading: user === null,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useCurrentUser(): CurrentUser {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useCurrentUser must be used within UserProvider");
  }

  return context;
}
