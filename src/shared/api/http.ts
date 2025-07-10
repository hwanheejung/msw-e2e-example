export async function request<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  // In case of 204 No Content
  if (res.status === 204) {
    return undefined as unknown as T;
  }
  return (await res.json()) as T;
}
