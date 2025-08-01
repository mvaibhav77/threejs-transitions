import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useSceneLoading } from "../../hooks/useSceneLoading";
import { MeshStandardMaterial, type Mesh } from "three";
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
  type = "mesh",
}: {
  meshProps: MeshProps;
  index: number;
  type?: "mesh" | "solid";
}) {
  const meshRef = useRef<Mesh>(null);

  const materials = useMemo(
    () => ({
      mesh: new MeshStandardMaterial({ color: 0x00ff00, wireframe: true }),
      solid: new MeshStandardMaterial({ color: 0xff1493, wireframe: false }),
    }),
    []
  );

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
      <meshStandardMaterial
        {...(type === "mesh" ? materials.mesh : materials.solid)}
      />
    </mesh>
  );
}

function FlyingObjects() {
  // Scene loading detection - manual control
  const { setSceneReady } = useSceneLoading({
    minLoadTime: 800, // Reduced minimum time since we're optimizing
  });

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

  // Mark scene as ready after fewer frames for faster loading
  const frameCount = useRef(0);
  useFrame(() => {
    frameCount.current++;
    if (frameCount.current === 5) {
      // After 5 frames instead of 10, consider scene ready
      console.log("Marking scene as ready after 5 frames");
      setSceneReady();
    }
  });

  return (
    <>
      {/* Render Wireframe Objects */}
      {meshProps.map((props, index) => (
        <AnimatedObject
          key={`mesh-${index}`}
          meshProps={props}
          index={index}
          type="solid"
        />
      ))}
    </>
  );
}

export default FlyingObjects;
