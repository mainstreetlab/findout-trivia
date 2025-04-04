import { useState, useEffect } from "react";

// Define the settings interface
export interface Settings {
  expiry: string;
  prizeSplit: string;
  mode: string;
  unitTimer: string;
  customEnabled: {
    prizeSplit: boolean;
    mode: boolean;
  };
}

// Default settings
const defaultSettings: Settings = {
  expiry: "24 hrs",
  prizeSplit: "winner-takes-all",
  mode: "custom",
  unitTimer: "30",
  customEnabled: {
    prizeSplit: false,
    mode: false,
  },
};

// LocalStorage key
const SETTINGS_STORAGE_KEY = "findout_settings";

export function useSettingsStore() {
  // Initialize state with default values
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load settings from localStorage on initial render
  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      }
    } catch (error) {
      console.error("Failed to load settings from localStorage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
      } catch (error) {
        console.error("Failed to save settings to localStorage:", error);
      }
    }
  }, [settings, isLoaded]);

  // Update a single setting
  const updateSetting = <K extends keyof Settings>(
    key: K,
    value: Settings[K],
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Reset settings to defaults
  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return {
    settings,
    updateSetting,
    resetSettings,
    isLoaded,
  };
}
