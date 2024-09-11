import React, { createContext, useContext, useState, ReactNode } from "react";

type ScreenState =
  | "welcome"
  | "login"
  | "register"
  | "info"
  | "chatbot"
  | "security"
  | "home"
  | "community"
  | "settings";

interface ScreenContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  currentScreen: ScreenState;
  setCurrentScreen: React.Dispatch<React.SetStateAction<ScreenState>>;
}

const ScreenContext = createContext<ScreenContextProps | undefined>(undefined);

export const useScreenContext = () => {
  const context = useContext(ScreenContext);
  if (!context) {
    throw new Error("useScreenContext must be used within a ScreenProvider");
  }
  return context;
};

export const ScreenProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentScreen, setCurrentScreen] = useState<ScreenState>("welcome");

  return (
    <ScreenContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, currentScreen, setCurrentScreen }}
    >
      {children}
    </ScreenContext.Provider>
  );
};
