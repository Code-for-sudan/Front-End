import { useRef } from "react";

export const useAutocompleteWebSocket = (onSuggestions) => {
  const wsRef = useRef(null);

  const connect = () => {
    if (wsRef.current) return;

    const ws = new WebSocket("wss://sudamall.ddns.net/ws/autocomplete/");
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.error) {
          // If backend sends an error message in response
          console.error("WebSocket server error:", data.error);
        } else if (data.suggestions) {
          onSuggestions(data.suggestions); // Render suggestions
          console.log(data)
        } else {
          console.warn("Unexpected message structure:", data);
        }
      } catch (err) {
        console.error("Failed to parse WebSocket message:", event.data, err);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      wsRef.current = null;
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      ws.close();
    };
  };

  const disconnect = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  const sendQuery = (msg) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  };

  return {
    connect,
    disconnect,
    sendQuery,
  };
};
