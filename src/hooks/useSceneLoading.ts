import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useLoading } from "./useLoading";

interface UseSceneLoadingProps {
  minLoadTime?: number; // Minimum loading time in ms
}

export const useSceneLoading = ({
  minLoadTime = 1000,
}: UseSceneLoadingProps = {}) => {
  const { setIsLoading, setLoadingProgress } = useLoading();
  const startTimeRef = useRef(Date.now());
  const hasCompletedRef = useRef(false);
  const sceneReadyRef = useRef(false);

  useEffect(() => {
    startTimeRef.current = Date.now();
    hasCompletedRef.current = false;
    sceneReadyRef.current = false;
    setLoadingProgress(0);
    console.log("Scene loading started");
  }, [setLoadingProgress]);

  // Function that scenes can call when they're ready
  const setSceneReady = () => {
    sceneReadyRef.current = true;
    console.log("Scene marked as ready");
  };

  useFrame(() => {
    if (hasCompletedRef.current) return;

    const currentTime = Date.now();
    const elapsedTime = currentTime - startTimeRef.current;

    // Simple time-based progress
    const timeProgress = Math.min((elapsedTime / minLoadTime) * 100, 99);

    // Use requestIdleCallback for non-urgent updates to yield to main thread
    if ("requestIdleCallback" in window) {
      requestIdleCallback(
        () => {
          setLoadingProgress(timeProgress);
        },
        { timeout: 100 }
      );
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        setLoadingProgress(timeProgress);
      }, 0);
    }

    // Check if we can complete loading
    const minTimeElapsed = elapsedTime >= minLoadTime;
    const canComplete = sceneReadyRef.current && minTimeElapsed;

    if (canComplete || elapsedTime >= minLoadTime * 2) {
      // Force complete after double the min time even if scene isn't marked ready
      hasCompletedRef.current = true;
      setLoadingProgress(100);

      console.log("Scene loading complete", {
        sceneReady: sceneReadyRef.current,
        elapsedTime,
        forced: !sceneReadyRef.current,
      });

      // Use setTimeout to avoid blocking the main thread
      setTimeout(() => {
        console.log("Setting isLoading to false");
        setIsLoading(false);
      }, 300);
    }
  });

  return { setSceneReady };
};
