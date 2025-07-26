// create a camera controller for SceneOne
// so the scene have lots of objects and the camera move around slowly on its own through the space

import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3 } from "three";

const CameraController = () => {
  const { camera } = useThree();
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;

    // Smooth camera movement based on time
    const time = timeRef.current * 0.1;

    // Orbital movement around the origin
    const radius = 2000;
    camera.position.x = Math.sin(time * 0.5) * radius * 0.3;
    camera.position.y = Math.cos(time * 0.3) * radius * 0.2;
    camera.position.z = 2000 + Math.sin(time * 0.2) * 500;

    // Always look towards the center with slight offset
    const lookAtTarget = new Vector3(
      Math.sin(time * 0.1) * 200,
      Math.cos(time * 0.15) * 150,
      0
    );
    camera.lookAt(lookAtTarget);
  });

  // Return null as this component does not render anything
  return null;
};

export default CameraController;
