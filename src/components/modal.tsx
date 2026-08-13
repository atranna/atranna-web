"use client";
import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./button";

export function Modal({
  open,
  title,
  subtitle,
  onClose,
  children,
  maxWidth = "max-w-2xl",
}: {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
}) {
  useEffect(() => {
    if (!open) {
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur bg-gray-300/40"
      onClick={onClose}
    >
      <div
        className={`w-full ${maxWidth} rounded-lg border border-surface-0 bg-latte-mantle dark:bg-mocha-mantle text-latte-text dark:text-mocha-text p-6`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">{title}</h2>
            {subtitle ? (
              <p className="mt-1 text-sm text-latte-overlay-0 dark:text-mocha-overlay-0">
                {subtitle}
              </p>
            ) : null}
          </div>
          <Button type="button" onClick={onClose} className="h-10 w-10">
            <X size={18} />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
