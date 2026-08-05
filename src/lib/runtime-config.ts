export type RuntimeConfig = {
  apiUrl: string;
};

declare global {
  interface Window {
    __ATRANNA_RUNTIME_CONFIG__?: RuntimeConfig;
  }
}

export function getRuntimeApiUrl() {
  if (typeof window === "undefined") {
    throw new Error("Runtime API URL is only available in the browser.");
  }

  const apiUrl = window.__ATRANNA_RUNTIME_CONFIG__?.apiUrl;

  if (!apiUrl) {
    throw new Error("Runtime API URL is not configured.");
  }

  return apiUrl;
}
