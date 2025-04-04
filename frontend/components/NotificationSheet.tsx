"use client";
import { useState } from "react";
import { ArrowLeft, Check, Bell, BellRing } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNotificationStore } from "@/lib/hooks/useNotificationStore";
import Link from "next/link";
import {
  mockNotifications,
  createMockNotificationsWithTimestamps,
} from "@/lib/mockData";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

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
              <div className="flex items-center gap-4">
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
                  onClick={markAllAsRead}
                  className="text-purple-600 hover:text-purple-700"
                >
                  Mark all as read
                </Button>
              )}
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <Bell className="h-12 w-12 text-gray-300 mb-2" />
                <h3 className="text-lg font-medium mb-1">No notifications</h3>
                <p className="text-sm text-gray-500 mb-4">
                  You don't have any notifications yet.
                </p>
                <Button
                  onClick={loadMockData}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Load Sample Notifications
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {notifications.map((notification) => {
                  const isWin = notification.type === "win";
                  const isLoss = notification.type === "loss";
                  const isSuccess = notification.type === "success";
                  const isInfo = notification.type === "info";

                  return (
                    <Card
                      key={notification.id}
                      className={cn(
                        "overflow-hidden transition-all hover:shadow-md cursor-pointer",
                        !notification.read && "border-l-4 border-l-purple-500",
                        isWin && "bg-pink-50",
                        isLoss && "bg-red-50",
                        isSuccess && "bg-green-50",
                      )}
                      onClick={() => {
                        if (!notification.read) {
                          markAsRead(notification.id);
                        }
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              "rounded-full p-2 flex-shrink-0",
                              isWin && "bg-pink-100",
                              isLoss && "bg-red-100",
                              isSuccess && "bg-green-100",
                              isInfo && "bg-blue-100",
                            )}
                          >
                            <BellRing
                              className={cn(
                                "h-4 w-4",
                                isWin && "text-pink-600",
                                isLoss && "text-red-600",
                                isSuccess && "text-green-600",
                                isInfo && "text-blue-600",
                              )}
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-2">
                                {!notification.read && (
                                  <Badge
                                    variant="outline"
                                    className="bg-purple-100 text-purple-800 border-purple-200 text-xs"
                                  >
                                    New
                                  </Badge>
                                )}
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "text-xs",
                                    isWin &&
                                      "bg-pink-100 text-pink-800 border-pink-200",
                                    isLoss &&
                                      "bg-red-100 text-red-800 border-red-200",
                                    isSuccess &&
                                      "bg-green-100 text-green-800 border-green-200",
                                    isInfo &&
                                      "bg-blue-100 text-blue-800 border-blue-200",
                                  )}
                                >
                                  {notification.type.charAt(0).toUpperCase() +
                                    notification.type.slice(1)}
                                </Badge>
                              </div>

                              <span className="text-xs text-gray-500">
                                {formatDistanceToNow(notification.timestamp, {
                                  addSuffix: true,
                                })}
                              </span>
                            </div>

                            <p className="text-sm mt-2 font-medium">
                              {notification.message}
                            </p>

                            {notification.hasAction && (
                              <div className="mt-3 flex flex-wrap gap-4">
                                {isWin && (
                                  <Button
                                    size="md"
                                    className="bg-purple-500 hover:bg-purple-600 text-white"
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent card click
                                      // Handle claim action
                                      console.log("Claiming prize");
                                    }}
                                  >
                                    Claim
                                  </Button>
                                )}
                                {notification.quizId && (
                                  <Button
                                    size="md"
                                    variant="outline"
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent card click
                                      // Navigate to stats page
                                      window.location.href = `/quiz/${notification.quizId}/stats`;
                                    }}
                                  >
                                    Check stats
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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
