import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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

interface SettingsState {
  settings: Settings;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,

      updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) =>
        set((state) => ({
          settings: {
            ...state.settings,
            [key]: value,
          },
        })),

      resetSettings: () => set({ settings: defaultSettings }),
    }),
    {
      name: "findout-settings",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
