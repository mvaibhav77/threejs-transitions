import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import CameraController from "./CameraController";
import type { Mesh } from "three";
import { OBJ_SIZE, OBJ_COUNT } from "../../utils/constants";

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

  useFrame((_, delta) => {
    if (meshRef.current) {
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
      scale={meshProps.scale}
    >
      <tetrahedronGeometry args={[OBJ_SIZE, 0]} />
      <meshStandardMaterial color={0x00ff00} />
    </mesh>
  );
}

function FlyingObjects() {
  // Generate stable mesh properties using useMemo
  const meshProps = useMemo(() => {
    const arr: MeshProps[] = [];
    for (let i = 0; i < OBJ_COUNT; i += 1) {
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
