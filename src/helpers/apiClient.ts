const API_URL = "https://69a88a8937caab4b8c6203c6.mockapi.io/todo";
const API_ERROR = "Request failed";

export interface FetchOptions extends RequestInit {
  body?: any;
}

export const apiClient = async <T>(
  id: string,
  options: FetchOptions = {},
  signal?: AbortSignal,
): Promise<T> => {
  const res = await fetch(`${API_URL}${id}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    signal,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || API_ERROR);
  }

  return data as T;
};
