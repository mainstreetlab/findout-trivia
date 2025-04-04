"use client";
import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNotificationStore } from "@/lib/hooks/useNotificationStore";
import Link from "next/link";
import {
  mockNotifications,
  createMockNotificationsWithTimestamps,
} from "@/lib/mockData";
import { formatDistanceToNow } from "date-fns";

// Add this CSS to your global.css file or create a new CSS module
// .hide-close-button [data-radix-collection-item][role="button"] {
//   display: none;
// }

interface NotificationSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NotificationSheet({
  open,
  onOpenChange,
}: NotificationSheetProps) {
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    isLoaded,
    addNotification,
    setNotifications,
  } = useNotificationStore();

  // Don't render until notifications are loaded from localStorage
  if (!isLoaded) return null;

  const loadMockData = () => {
    const mockNotificationsWithTimestamps =
      createMockNotificationsWithTimestamps();
    setNotifications(mockNotificationsWithTimestamps);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0"
        closeButton={false}
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2 h-9 w-9 rounded-full flex items-center justify-center"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </SheetClose>
                <SheetTitle className="text-xl">Notifications</SheetTitle>
              </div>

              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-purple-600 hover:text-purple-700 flex items-center gap-1"
                  onClick={markAllAsRead}
                >
                  <Check className="h-4 w-4" />
                  <span>Mark all as read</span>
                </Button>
              )}
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p>No notifications yet</p>
                <Button
                  onClick={loadMockData}
                  className="mt-4 bg-purple-500 hover:bg-purple-600 text-white"
                >
                  Load Sample Notifications
                </Button>
              </div>
            ) : (
              <div>
                {notifications.map((notification, index) => {
                  const isWin = notification.type === "win";
                  const isLoss = notification.type === "loss";
                  const isSuccess = notification.type === "success";

                  let bgColor = !notification.read ? "bg-gray-50" : "";
                  if (isWin) bgColor = "bg-pink-100";
                  if (isLoss) bgColor = "bg-red-100";
                  if (isSuccess) bgColor = "bg-green-50";

                  return (
                    <div key={notification.id}>
                      <div
                        className={`p-4 ${bgColor}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start">
                          <div className="flex-1">
                            <div className="flex items-center">
                              {!notification.read && (
                                <div className="w-2 h-2 bg-red-500 rounded-full mr-2 flex-shrink-0"></div>
                              )}
                              <p className="text-sm">{notification.message}</p>
                            </div>

                            <div className="mt-1 text-xs text-gray-500">
                              {formatDistanceToNow(notification.timestamp, {
                                addSuffix: true,
                              })}
                            </div>

                            {notification.hasAction && (
                              <div className="mt-3 flex space-x-2">
                                {isWin && (
                                  <Button
                                    size="sm"
                                    className="bg-purple-500 hover:bg-purple-600 text-white"
                                  >
                                    Claim
                                  </Button>
                                )}
                                {notification.quizId && (
                                  <Link
                                    href={`/quiz/${notification.quizId}/stats`}
                                  >
                                    <Button size="sm" variant="outline">
                                      Check stats
                                    </Button>
                                  </Link>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {index < notifications.length - 1 && <Separator />}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="p-4 border-t text-center text-purple-600">
            Findout
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
