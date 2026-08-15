import { toast } from "sonner";

export function toastSuccess(message: string) {
  toast.success(message, {
    style: {
      background: "var(--color-mantle)",
      color: "var(--color-green)",
      border: "1px solid var(--color-green)",
    },
  });
}

export function toastError(message: string) {
  toast.error(message, {
    style: {
      background: "var(--color-mantle)",
      color: "var(--color-red)",
      border: "1px solid var(--color-red)",
    },
  });
}
