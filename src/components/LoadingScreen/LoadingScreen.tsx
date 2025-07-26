import { useLoading } from "../../hooks/useLoading";
import { useState, useEffect } from "react";
import "./LoadingScreen.css";

const LoadingScreen = () => {
  const { isLoading, loadingProgress } = useLoading();
  const [showProgress, setShowProgress] = useState(false);

  // Delay showing progress bar to ensure loading screen renders immediately
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProgress(true);
    }, 100); // Show progress after 100ms

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading Scene...</p>
        {showProgress && (
          <>
            <div className="loading-progress">
              <div
                className="loading-progress-bar"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <span className="loading-percentage">
              {Math.round(loadingProgress)}%
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
