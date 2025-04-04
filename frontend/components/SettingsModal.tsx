"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Zod schema for unit timer validation
const unitTimerSchema = z.coerce
  .number()
  .positive("Timer must be a positive number")
  .int("Timer must be a whole number")
  .min(1, "Timer must be at least 1 second");

export default function SettingsModal({
  open,
  onOpenChange,
}: SettingsModalProps) {
  const [expiry, setExpiry] = useState("24hrs");
  const [prizeSplit, setPrizeSplit] = useState("winner-takes-all");
  const [mode, setMode] = useState("custom");
  const [unitTimer, setUnitTimer] = useState("30");
  const [timerError, setTimerError] = useState<string | null>(null);
  const [customEnabled, setCustomEnabled] = useState({
    prizeSplit: false,
    mode: false,
  });

  const handleTimerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUnitTimer(value);

    try {
      unitTimerSchema.parse(value);
      setTimerError(null);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setTimerError(error.errors[0].message);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <DialogTitle className="text-xl">Settings Modal</DialogTitle>
        </div>

        <div className="space-y-8">
          {/* Expiry */}
          <div className="flex items-center justify-between">
            <Label htmlFor="expiry" className="text-base font-medium">
              Expiry:
            </Label>
            <Select value={expiry} onValueChange={setExpiry}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24 hrs" className="hover:text-white">
                  24 hrs
                </SelectItem>
                <SelectItem value="3 days" className="hover:text-white">
                  3 days
                </SelectItem>
                <SelectItem value="1 week" className="hover:text-white">
                  1 week
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Prize Split */}
          <div className="flex items-center justify-between">
            <Label htmlFor="prize-split" className="text-base font-medium">
              Prize split:
            </Label>
            <div className="flex items-center gap-2">
              <Select
                value={prizeSplit}
                onValueChange={setPrizeSplit}
                disabled={customEnabled.prizeSplit}
              >
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="winner-takes-all"
                    className="hover:text-white"
                  >
                    Winner takes all
                  </SelectItem>
                  <SelectItem value="every-winner" className="hover:text-white">
                    Every winner
                  </SelectItem>
                  <SelectItem value="custom" className="hover:text-white">
                    Custom
                  </SelectItem>
                </SelectContent>
              </Select>
              <Checkbox
                id="custom-prize-split"
                checked={customEnabled.prizeSplit}
                onCheckedChange={(checked) => {
                  setCustomEnabled({
                    ...customEnabled,
                    prizeSplit: checked === true,
                  });
                }}
              />
            </div>
          </div>

          {/* Modes */}
          <div className="flex items-center justify-between">
            <Label htmlFor="modes" className="text-base font-medium">
              Question modes:
            </Label>
            <div className="flex items-center gap-2">
              <Select
                value={mode}
                onValueChange={setMode}
                disabled={customEnabled.mode}
              >
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short" className="hover:text-white">
                    Short (5)
                  </SelectItem>
                  <SelectItem value="long" className="hover:text-white">
                    Long (30)
                  </SelectItem>
                  <SelectItem value="custom" className="hover:text-white">
                    Custom
                  </SelectItem>
                </SelectContent>
              </Select>
              <Checkbox
                id="custom-mode"
                checked={customEnabled.mode}
                onCheckedChange={(checked) => {
                  setCustomEnabled({
                    ...customEnabled,
                    mode: checked === true,
                  });
                }}
              />
            </div>
          </div>

          {/* Unit Timer */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="unit-timer" className="text-base font-medium">
                Unit timer:
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="unit-timer"
                  value={unitTimer}
                  onChange={handleTimerChange}
                  onKeyDown={(e) =>
                    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                  }
                  className={`w-44 text-center bg-gray-100 ${timerError ? "border-red-500" : ""}`}
                  type="number"
                  min="1"
                />
                <span className="text-sm">secs</span>
              </div>
            </div>
            {timerError && (
              <p className="text-red-500 text-sm text-right">{timerError}</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
