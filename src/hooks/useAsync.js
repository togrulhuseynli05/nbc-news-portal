import { useState, useCallback, useRef } from "react";

export function useAsync(asyncFunction) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const latestRequestId = useRef(0);

  const execute = useCallback(
    async (...args) => {
      const requestId = ++latestRequestId.current;
      setStatus("loading");
      setError(null);

      try {
        const response = await asyncFunction(...args);
        if (requestId === latestRequestId.current) {
          setData(response);
          setStatus("success");
        }
        return response;
      } catch (err) {
        if (requestId === latestRequestId.current) {
          setError(err.message || "İşlem başarısız");
          setStatus("error");
        }
        throw err;
      }
    },
    [asyncFunction],
  );

  return {
    execute,
    data,
    error,
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
  };
}
