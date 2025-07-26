import { Canvas } from "@react-three/fiber";
import FlyingObjects from "./FlyingObjects";
import { ACESFilmicToneMapping } from "three";

function SceneOne() {
  return (
    <div id="canvas-container">
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

        <FlyingObjects />
      </Canvas>
    </div>
  );
}

export default SceneOne;
