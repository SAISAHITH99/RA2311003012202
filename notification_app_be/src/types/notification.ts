// Notification type definitions
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  isRead: boolean;
  createdAt: Date;
}

export interface CreateNotificationDto {
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
}