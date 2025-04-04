"use client";

import { useState } from "react";
import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type Currency = "USD" | "ETH" | "USDC" | "NGN";

interface Quiz {
  id: string;
  title: string;
  status: "completed" | "in-progress";
  timeLeft?: string;
}

export default function ProfileDashboard() {
  const { user } = usePrivy();
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("USD");

  // Mock data - replace with actual data from your API
  const earnings = 30.0;
  const quizzes: Quiz[] = [
    {
      id: "4",
      title: "Quiz #4",
      status: "in-progress",
      timeLeft: "2 days left",
    },
    {
      id: "3",
      title: "Quiz #3",
      status: "in-progress",
      timeLeft: "15 hrs left",
    },
    { id: "2", title: "Quiz #2", status: "completed" },
    { id: "1", title: "Quiz #1", status: "completed" },
  ];

  const currencies: Currency[] = ["USD", "ETH", "USDC", "NGN"];

  return (
    <main className="h-screen pt-28">
      <div className="container mx-auto h-full bg-white md:max-w-md pt-6">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-center flex-1">
              Profile Dashboard
            </h1>
            <div className="w-8"></div> {/* Spacer for alignment */}
          </div>

          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold">${earnings.toFixed(2)}</h2>
              <p className="text-sm text-gray-500">amounts earned</p>
            </div>

            <div className="border rounded">
              {currencies.map((currency) => (
                <button
                  key={currency}
                  onClick={() => setSelectedCurrency(currency)}
                  className={`block w-full px-3 py-1 text-sm text-center ${
                    selectedCurrency === currency
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {currency}
                </button>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="flex justify-between items-center p-2 border-b"
              >
                <span className="font-medium">{quiz.title}</span>
                {quiz.status === "completed" ? (
                  <span className="text-green-500 text-sm">Completed</span>
                ) : (
                  <span className="text-gray-500 text-sm">{quiz.timeLeft}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto py-3 text-center text-purple-600 bg-gray-50">
          Findout
        </div>
      </div>
    </main>
  );
}
