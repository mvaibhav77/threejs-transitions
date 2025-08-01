import { Canvas } from "@react-three/fiber";
import FlyingObjects from "./FlyingObjects";
import { ACESFilmicToneMapping } from "three";
import { useLoading } from "../../hooks/useLoading";
import CameraController from "./CameraController";

function SceneOne() {
  const { isLoading } = useLoading();

  return (
    <div
      id="canvas-container"
      style={{
        opacity: isLoading ? 0 : 1,
        transition: "opacity 0.5s ease-in-out",
        pointerEvents: isLoading ? "none" : "auto",
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 2000],
          fov: 50,
          near: 1,
          far: 10000,
        }}
        gl={{
          antialias: true,
          toneMapping: ACESFilmicToneMapping,
          outputColorSpace: "srgb",
        }}
      >
        <color attach="background" args={[0x000111]} />

        <hemisphereLight args={[0xffffff, 0x555555, 1.0]} />

        <fogExp2 attach="fog" args={[0x000111, 0.0001]} />

      <CameraController />


        <FlyingObjects />
      </Canvas>
    </div>
  );
}

export default SceneOne;
