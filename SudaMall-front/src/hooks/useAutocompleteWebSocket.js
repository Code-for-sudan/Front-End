import { useEffect, useRef } from "react";

export const useAutocompleteWebSocket = (
  onSuggestions
) => {
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("wss://sudamall.ddns.net/ws/autocomplete/");
    wsRef.current = ws;

    ws.onopen = () => console.log("WebSocket connected");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.suggestions) {
        onSuggestions(data.suggestions);
      }
    };

    ws.onclose = () => console.log("WebSocket disconnected");
    ws.onerror = (err) => console.error("WebSocket error", err);

    return () => {
      ws.close();
    };
  }, [onSuggestions]);

  const sendQuery = (msg) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  };

  return sendQuery;
};
