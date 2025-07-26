import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import CameraController from "./CameraController";
import type { Mesh } from "three";

const objCount = 1000;

interface MeshProps {
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: number;
  rotationSpeed: { x: number; y: number; z: number };
}

// Individual animated object component
function AnimatedObject({
  meshProps,
  index,
}: {
  meshProps: MeshProps;
  index: number;
}) {
  const meshRef = useRef<Mesh>(null);
  const size = 0.35;

  useFrame((_, delta) => {
    if (meshRef.current) {
      // Apply rotation similar to getFXScene pattern
      meshRef.current.rotation.x += delta * meshProps.rotationSpeed.x;
      meshRef.current.rotation.y += delta * meshProps.rotationSpeed.y;
      meshRef.current.rotation.z += delta * meshProps.rotationSpeed.z;
    }
  });

  return (
    <mesh
      ref={meshRef}
      key={index}
      position={[
        meshProps.position.x,
        meshProps.position.y,
        meshProps.position.z,
      ]}
      rotation={[
        meshProps.rotation.x,
        meshProps.rotation.y,
        meshProps.rotation.z,
      ]}
      scale={meshProps.scale}
    >
      <dodecahedronGeometry args={[size, 2]} />
      <meshStandardMaterial color={0x00ff00} wireframe />
    </mesh>
  );
}

function FlyingObjects() {
  // Generate stable mesh properties using useMemo
  const meshProps = useMemo(() => {
    const arr: MeshProps[] = [];
    for (let i = 0; i < objCount; i += 1) {
      arr.push({
        position: {
          x: Math.random() * 10000 - 5000,
          y: Math.random() * 6000 - 3000,
          z: Math.random() * 8000 - 4000,
        },
        rotation: {
          x: Math.random() * 2 * Math.PI,
          y: Math.random() * 2 * Math.PI,
          z: Math.random() * 2 * Math.PI,
        },
        scale: Math.random() * 200 + 100,
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.4, // Random rotation speed between -0.2 and 0.2
          y: (Math.random() - 0.5) * 0.4,
          z: (Math.random() - 0.5) * 0.4,
        },
      });
    }
    return arr;
  }, []);

  return (
    <>
      <CameraController />

      {/* Render Objects */}
      {meshProps.map((props, index) => (
        <AnimatedObject key={index} meshProps={props} index={index} />
      ))}
    </>
  );
}

export default FlyingObjects;
