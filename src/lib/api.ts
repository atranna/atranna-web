export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function getJwtToken(): string | null {
  return localStorage.getItem("jwtToken");
}

export function getActiveOrganization(): string {
  return localStorage.getItem("activeOrganization") || "0";
}

type ApiFetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  includeOrg?: boolean;
};

export async function apiFetch<T = unknown>(
  path: string,
  { method = "GET", body, headers, includeOrg = true }: ApiFetchOptions = {},
): Promise<T> {
  const token = getJwtToken();

  const baseHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    baseHeaders.Authorization = `Bearer ${token}`;
  }

  if (includeOrg) {
    baseHeaders["X-Org-ID"] = getActiveOrganization();
  }

  const response = await fetch(`/api/v1${path}`, {
    method,
    headers: { ...baseHeaders, ...headers },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const data = await response.json();
      message = data.message || data.error || message;
    } catch {
      // ignore non-JSON error bodies
    }

    throw new ApiError(message, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export function asArray<T>(data: unknown): T[] {
  if (Array.isArray(data)) {
    return data as T[];
  }

  if (Array.isArray((data as { users?: unknown })?.users)) {
    return (data as { users: T[] }).users;
  }

  return [];
}
