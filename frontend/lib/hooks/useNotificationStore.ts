import { useState, useEffect } from "react";
import { Notification } from "@/lib/types/notification";

// LocalStorage key
const NOTIFICATIONS_STORAGE_KEY = "findout_notifications";

export function useNotificationStore() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load notifications from localStorage on initial render
  useEffect(() => {
    try {
      const storedNotifications = localStorage.getItem(
        NOTIFICATIONS_STORAGE_KEY,
      );
      if (storedNotifications) {
        const parsedNotifications = JSON.parse(storedNotifications).map(
          (notification: any) => ({
            ...notification,
            timestamp: new Date(notification.timestamp),
          }),
        );
        setNotifications(parsedNotifications);
        setUnreadCount(
          parsedNotifications.filter((n: Notification) => !n.read).length,
        );
      }
    } catch (error) {
      console.error("Failed to load notifications from localStorage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(
          NOTIFICATIONS_STORAGE_KEY,
          JSON.stringify(notifications),
        );
        setUnreadCount(notifications.filter((n) => !n.read).length);
      } catch (error) {
        console.error("Failed to save notifications to localStorage:", error);
      }
    }
  }, [notifications, isLoaded]);

  // Add a new notification
  const addNotification = (
    notification: Omit<Notification, "id" | "timestamp" | "read">,
  ) => {
    console.log("Adding notification:", notification);
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };

    setNotifications((prev) => [newNotification, ...prev]);
  };

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true })),
    );
  };

  // Remove a notification
  const removeNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  return {
    notifications,
    unreadCount,
    isLoaded,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearNotifications,
    setNotifications,
  };
}
