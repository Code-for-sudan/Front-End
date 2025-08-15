import { useEffect, useRef, useState, useCallback } from "react";
import { TokenService } from "../../auth/tokenService";

const STORAGE_KEY = "chat_message_queue";
const HEARTBEAT_INTERVAL = 25000; // 25s
const MAX_MESSAGE_AGE = 24 * 60 * 60 * 1000; // 24h

export const useChatSocket = ({ receiverId, onEvent }) => {
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const messageQueueRef = useRef([]);
  const shouldReconnectRef = useRef(true);
  const lastTokenRef = useRef(null);
  const lastConnectAttemptRef = useRef(0);
  const heartbeatIntervalRef = useRef(null);

  /** Load queue from localStorage */
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      const validMessages = Array.isArray(stored)
        ? stored.filter(msg => Date.now() - msg.timestamp < MAX_MESSAGE_AGE)
        : [];
      messageQueueRef.current = validMessages;
      saveQueueToStorage(validMessages);
    } catch {
      messageQueueRef.current = [];
    }
  }, []);

  /** Save queue to localStorage */
  const saveQueueToStorage = useCallback((queue = messageQueueRef.current) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
    } catch (err) {
      console.error("Failed to save message queue:", err);
    }
  }, []);

  /** Flush queued messages */
  const flushMessageQueue = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      while (messageQueueRef.current.length > 0) {
        const { data } = messageQueueRef.current.shift();
        wsRef.current.send(data);
      }
      saveQueueToStorage();
    }
  }, [saveQueueToStorage]);

  /** Start heartbeat pings */
  const startHeartbeat = useCallback(() => {
    clearInterval(heartbeatIntervalRef.current);
    heartbeatIntervalRef.current = setInterval(() => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ event: "ping" }));
      }
    }, HEARTBEAT_INTERVAL);
  }, []);

  /** Stop heartbeat */
  const stopHeartbeat = useCallback(() => {
    clearInterval(heartbeatIntervalRef.current);
  }, []);

  /** Connect WebSocket with token refresh */
  const connect = useCallback(async () => {
    const token = await TokenService.getFreshAccessToken?.() 
      || TokenService.getAccessToken();
    if (!token) {
      console.warn("No valid token — skipping WebSocket connection.");
      return;
    }

    // Prevent multiple connections
    if (
      wsRef.current &&
      wsRef.current.readyState !== WebSocket.CLOSED &&
      wsRef.current.readyState !== WebSocket.CLOSING
    ) return;

    const now = Date.now();
    if (now - lastConnectAttemptRef.current < 3000) return; // 3s cooldown
    lastConnectAttemptRef.current = now;

    setConnectionStatus("connecting");
    const ws = new WebSocket(
      `wss://sudamall.ddns.net/ws/chat/?token=${encodeURIComponent(token)}`
    );
    wsRef.current = ws;
    lastTokenRef.current = token;

    ws.onopen = () => {
      setConnectionStatus("connected");
      console.log("WebSocket connected.");
      flushMessageQueue();
      startHeartbeat();
    };

    ws.onclose = (event) => {
      console.log("WebSocket closed");
      setConnectionStatus("disconnected");
      wsRef.current = null;
      stopHeartbeat();

      if (shouldReconnectRef.current) {
        reconnectTimeoutRef.current = setTimeout(connect, 5000); // retry slower
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      // Close to trigger onclose() → reconnect logic
      try {
        ws.close();
      } catch {}
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onEvent?.(data);
      } catch (e) {
        console.error("Invalid WebSocket message:", e);
      }
    };
  }, [flushMessageQueue, startHeartbeat, stopHeartbeat, onEvent]);

  /** Disconnect WebSocket */
  const disconnect = useCallback(() => {
    shouldReconnectRef.current = false;
    clearTimeout(reconnectTimeoutRef.current);
    stopHeartbeat();
    if (wsRef.current) {
      try {
        wsRef.current.close();
      } catch {}
      wsRef.current = null;
    }
  }, [stopHeartbeat]);

  /** Connect on token & receiverId ready */
  useEffect(() => {
    let mounted = true;
    const token = TokenService.getAccessToken();
    if (mounted && token && receiverId) {
      shouldReconnectRef.current = true;
      connect();
    }
    return () => {
      mounted = false;
      disconnect();
    };
  }, [connect, disconnect, receiverId]);

  /** Reconnect if token changes */
  useEffect(() => {
    const interval = setInterval(() => {
      const currentToken = TokenService.getAccessToken();
      if (currentToken && currentToken !== lastTokenRef.current) {
        disconnect();
        shouldReconnectRef.current = true;
        connect();
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [connect, disconnect]);

  /** Queue or send message */
  const queueOrSend = useCallback(
    (payload) => {
      const messageString = JSON.stringify(payload);
      const msgObj = { data: messageString, timestamp: Date.now() };

      if (wsRef.current?.readyState === WebSocket.OPEN) {
        try {
          wsRef.current.send(messageString);
        } catch {
          messageQueueRef.current.push(msgObj);
          saveQueueToStorage();
        }
      } else {
        messageQueueRef.current.push(msgObj);
        saveQueueToStorage();
      }
    },
    [saveQueueToStorage]
  );

  /** Public send functions */
  const sendMessage = useCallback(
    (text) => {
      if (!receiverId) return null;
      const tempId = `msg_${Date.now()}`;
      queueOrSend({
        event: "send_message",
        data: {
          receiver_id: receiverId,
          temp_id: tempId,
          message: text,
        },
      });
      return tempId;
    },
    [receiverId, queueOrSend]
  );

  const sendReadConfirmation = useCallback(
    (messageIds) => {
      queueOrSend({
        event: "read_confirmation",
        message_ids: messageIds,
      });
    },
    [queueOrSend]
  );

  return { connectionStatus, sendMessage, sendReadConfirmation };
};
