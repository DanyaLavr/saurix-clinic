import { useEffect, useState } from "react";

export function useAsync<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  deps: React.DependencyList,
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(false);

    fetcher(controller.signal)
      .then(setData)
      .catch((err) => {
        if (err.name !== "AbortError") setError(true);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, deps);

  return { data, loading, error };
}
