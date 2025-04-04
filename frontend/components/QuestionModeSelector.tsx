"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSettingsStore } from "@/hooks/useSettingsStore";
import useCreateQuizStore from "@/hooks/useCreateQuizStore";

export default function QuestionModeSelector() {
  const { settings, updateSetting } = useSettingsStore();
  const { applyQuestionMode } = useCreateQuizStore();

  // Initialize customCount from settings
  const [customCount, setCustomCount] = useState(() => {
    return settings.unitTimer || "5";
  });

  // Apply the current mode when component mounts
  useEffect(() => {
    console.log("Current mode:", settings.mode);
    console.log("Current unitTimer:", settings.unitTimer);

    // Initialize with current settings
    applyQuestionMode(settings.mode);
  }, []);

  const handleModeChange = (mode: string) => {
    console.log("Changing mode to:", mode);
    updateSetting("mode", mode);
    applyQuestionMode(mode);
  };

  const handleCustomCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log("Custom count changed to:", value);
    setCustomCount(value);

    // Only apply if it's a valid number
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0 && numValue <= 100) {
      // Update the unitTimer setting which we'll use for custom question count
      updateSetting("unitTimer", value);

      // If we're already in custom mode, apply the changes
      if (settings.mode === "custom") {
        applyQuestionMode("custom");
      }
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-lg font-medium">Question Mode</h3>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={settings.mode === "short" ? "default" : "outline"}
          onClick={() => handleModeChange("short")}
          className={settings.mode === "short" ? "bg-purple-600" : ""}
        >
          Short (5 questions)
        </Button>

        <Button
          variant={settings.mode === "long" ? "default" : "outline"}
          onClick={() => handleModeChange("long")}
          className={settings.mode === "long" ? "bg-purple-600" : ""}
        >
          Long (30 questions)
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant={settings.mode === "custom" ? "default" : "outline"}
            onClick={() => handleModeChange("custom")}
            className={settings.mode === "custom" ? "bg-purple-600" : ""}
          >
            Custom
          </Button>
        </div>
      </div>

      {settings.mode === "custom" && (
        <div className="flex items-center gap-2 mt-2">
          <Input
            type="number"
            value={customCount}
            onChange={handleCustomCountChange}
            className="w-40"
            placeholder="No. of questions"
            min="1"
            max="100"
          />
          <span className="text-sm text-gray-500">questions</span>
        </div>
      )}

      {settings.mode === "custom" && (
        <div className="text-sm text-gray-500">
          Custom mode allows you to specify the number of questions.
        </div>
      )}
    </div>
  );
}
