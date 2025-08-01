import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface Settings {
  fontSize: "small" | "medium" | "large";
  backgroundColor: "light" | "dark" | "auto";
  textColor: "black" | "blue" | "green" | "red" | "yellow";
  textWidth: "narrow" | "medium" | "wide";
  letterSpacing: "tight" | "normal" | "wide";
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

const defaultSettings: Settings = {
  fontSize: "medium",
  backgroundColor: "light",
  textColor: "black",
  textWidth: "medium",
  letterSpacing: "normal",
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  children,
}) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        isModalOpen,
        setIsModalOpen,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
