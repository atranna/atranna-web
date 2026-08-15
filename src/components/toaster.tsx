"use client";
import { Toaster } from "sonner";

export function ToasterProvider() {
  return (
    <Toaster
      theme="system"
      position="bottom-right"
      toastOptions={{
        style: {
          background: "var(--color-mantle)",
          color: "var(--color-text)",
          border: "1px solid var(--color-text)",
          borderRadius: "8px",
        },
      }}
    />
  );
}
