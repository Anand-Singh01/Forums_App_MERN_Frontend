import { setReadySate } from "../slices/wsSlice";
import store from "../store/store";
import { qcAddMessageToConversation } from "../tanstack/queryClient";

export interface IWebsocketMessage<T = unknown> {
  type: "message"|"status"|"notification";
  senderId: string;
  receiverId: string;
  message: T;
}
class WebSocketManager {
  private socket: WebSocket | null = null;
  private url: string = import.meta.env.VITE_WS_URL || "ws://localhost:3000";
  private static instance: WebSocketManager;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectInterval: number = 3000;

  private constructor() {}

  public static getInstance(): WebSocketManager {
    if (!this.instance) {
      this.instance = new WebSocketManager();
    }
    return this.instance;
  }

  public connect(): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.updateReadyState();
      return;
    }

    const userId = store.getState().userInfoSlice.userInfo.userId;
    if (!userId) {
      console.error("No authentication token found");
      return;
    }

    const wsUrl = `${this.url}?userId=${encodeURIComponent(userId)}`;
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      this.reconnectAttempts = 0;
      this.updateReadyState();
      console.log("WebSocket connected");
    };

    this.socket.onmessage = (event) => {
      try {
        if (typeof event.data === "string") {
          const data: IWebsocketMessage = JSON.parse(event.data);
          this.handleSocketMessage(data);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      this.updateReadyState();
    };

    this.socket.onclose = () => {
      this.updateReadyState();
      this.handleReconnection();
    };
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.updateReadyState();
    }
  }

  public sendMessage(message:IWebsocketMessage): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected");
      return;
    }

    try {
      this.socket.send(JSON.stringify(message));
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  public getReadyState(): number {
    return this.socket ? this.socket.readyState : WebSocket.CLOSED;
  }

  private updateReadyState(): void {
    store.dispatch(setReadySate(this.getReadyState()));
  }

  private handleReconnection(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(
        `Reconnecting attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}`
      );
      setTimeout(() => this.connect(), this.reconnectInterval);
    }
  }

  private handleSocketMessage(data: IWebsocketMessage<string>): void {
    const { type, senderId, message } = data;
    switch (type) {
      case "status":
        console.log(data);
        break;

      case "message":
        qcAddMessageToConversation(["conversation", senderId], message, senderId);
        break;

      default:
        console.warn("Unknown message type:", type);
    }
  }
}

export default WebSocketManager;