export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";
// Webhook URL usually points to the same API
export const WEBHOOK_URL = `${API_BASE_URL}/webhook`;

// Since we unified ports, the WebSocket URL uses the same base URL
// but Socket.IO needs the base URL (without path) usually.
export const WS_URL = API_BASE_URL;
