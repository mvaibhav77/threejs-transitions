import { useState } from "react";
import type { ReactNode } from "react";
import { LoadingContext } from "./LoadingContextTypes";

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const value = {
    isLoading,
    setIsLoading,
    loadingProgress,
    setLoadingProgress,
  };

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};
