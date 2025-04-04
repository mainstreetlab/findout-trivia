import { Notification } from "@/lib/types/notification";

export const mockNotifications: Omit<
  Notification,
  "id" | "timestamp" | "read"
>[] = [
  {
    type: "info",
    message: "Quiz #3 has received 30 entries",
    quizId: "3",
    quizTitle: "Quiz #3",
    hasAction: false,
  },
  {
    type: "success",
    message: "Quiz #4 successfully created",
    quizId: "4",
    quizTitle: "Quiz #4",
    hasAction: true,
  },
  {
    type: "win",
    message: 'You won 30k OUT in "0x..."\'s quiz',
    quizId: "5",
    quizTitle: "0x...'s quiz",
    hasAction: true,
  },
  {
    type: "info",
    message: "Quiz #1 completed with 42 participants",
    quizId: "1",
    quizTitle: "Quiz #1",
    hasAction: true,
  },
  {
    type: "success",
    message: "Your answer was submitted successfully",
    quizId: "7",
    quizTitle: "Crypto Basics",
    hasAction: false,
  },
  {
    type: "loss",
    message:
      "Vitalik.eth's quiz just ended. You didn't make this one. Try another!",
    quizId: "6",
    quizTitle: "Vitalik.eth's quiz",
    hasAction: true,
  },
  {
    type: "info",
    message: "New quiz available: 'Web3 Knowledge Test'",
    quizId: "8",
    quizTitle: "Web3 Knowledge Test",
    hasAction: true,
  },
  {
    type: "win",
    message: "Congratulations! You won 5 ETH in 'DeFi Masters'",
    quizId: "9",
    quizTitle: "DeFi Masters",
    hasAction: true,
  },
  {
    type: "success",
    message: "Your quiz 'Blockchain Basics' is now live",
    quizId: "10",
    quizTitle: "Blockchain Basics",
    hasAction: true,
  },
  {
    type: "loss",
    message: "Better luck next time on 'NFT Experts' quiz",
    quizId: "11",
    quizTitle: "NFT Experts",
    hasAction: true,
  },
];

// Helper function to create notifications with different timestamps
export function createMockNotificationsWithTimestamps() {
  return mockNotifications.map((notification, index) => {
    // Create notifications with different timestamps
    // Some from minutes ago, some from hours ago, some from days ago
    const hoursAgo = [0, 1, 3, 5, 12, 24, 48, 72, 96, 120][index];
    const timestamp = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);

    return {
      ...notification,
      id: `mock-${index}`,
      timestamp,
      read: index > 3, // First 4 are unread
    };
  });
}
