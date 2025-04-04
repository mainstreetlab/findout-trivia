"use client";

import { useEffect } from "react";
import { useNotificationStore } from "@/lib/hooks/useNotificationStore";
import { createMockNotificationsWithTimestamps } from "@/lib/mockData";

export default function MockDataLoader() {
  const { setNotifications, notifications, isLoaded } = useNotificationStore();

  useEffect(() => {
    // Add console log to debug
    console.log("MockDataLoader running", {
      isLoaded,
      notificationsCount: notifications.length,
    });

    // Only add mock data if there are no notifications yet
    if (isLoaded && notifications.length === 0) {
      console.log("Adding mock notifications");
      const mockNotificationsWithTimestamps =
        createMockNotificationsWithTimestamps();
      setNotifications(mockNotificationsWithTimestamps);
    }
  }, [isLoaded, notifications.length, setNotifications]);

  return null; // This component doesn't render anything
}
