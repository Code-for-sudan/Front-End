import { useRef, useState } from "react";
import { TokenService } from "../auth/tokenService";

export const useAutocompleteWebSocket = (onSuggestions) => {
  const wsRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = () => {
    if (wsRef.current) return;

    // Get token from your TokenService
    const token = TokenService.getAccessToken() || TokenService.getFreshAccessToken();
    if (!token) {
      console.error("No access token available for WebSocket connection.");
      return;
    }

    // Append token to WebSocket URL
    const wsUrl = `wss://sudamall.ddns.net/ws/autocomplete/?token=${encodeURIComponent(token)}`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected with token");
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.error) {
          console.error("WebSocket server error:", data.error);
        } else if (data.suggestions) {
          onSuggestions(data.suggestions);
          console.log(data);
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
      setIsConnected(false);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      ws.close();
      setIsConnected(false);
    };
  };

  const disconnect = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
      setIsConnected(false);
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
    isConnected,
  };
};
