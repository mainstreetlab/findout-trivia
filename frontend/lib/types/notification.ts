export type NotificationType =
  | "info" // Regular notification
  | "success" // Success notification (green)
  | "win" // Win notification (highlighted)
  | "loss"; // Loss notification (highlighted)

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  quizId?: string;
  quizTitle?: string;
  timestamp: Date;
  read: boolean;
  hasAction?: boolean;
}
