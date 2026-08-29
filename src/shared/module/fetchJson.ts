export async function fetchJson<T>(
  url: string,
  signal: AbortSignal,
  fallbackOn404?: T,
): Promise<T> {
  const res = await fetch(url, { signal });
  if (res.status === 404 && fallbackOn404 !== undefined) {
    return fallbackOn404;
  }

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json();
}
