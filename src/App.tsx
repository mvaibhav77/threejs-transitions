import { LoadingProvider } from "./contexts/LoadingContext";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import { lazy, Suspense } from "react";

// Lazy load the heavy Three.js scene to defer bundle loading
const SceneOne = lazy(() => import("./scenes/SceneOne"));

function App() {
  return (
    <LoadingProvider>
      <main>
        <LoadingScreen />
        <Suspense fallback={null}>
          <SceneOne />
          {/* // other scenes // */}
        </Suspense>
      </main>
    </LoadingProvider>
  );
}

export default App;
