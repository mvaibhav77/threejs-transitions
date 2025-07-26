// create a camera controller for SceneOne
// so the scene have lots of objects and the camera move around slowly on its own through the space

import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const CameraController = () => {
  const { camera, scene, size } = useThree();
  const timeRef = useRef(0);

  useEffect(() => {
    const w = size.width;
    const h = size.height;

    // Update camera properties if it's a PerspectiveCamera
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = 50;
      camera.aspect = w / h;
      camera.near = 1;
      camera.far = 10000;
      camera.position.z = 2000;
      camera.updateProjectionMatrix();
    }

    // Add fog to the scene
    scene.fog = new THREE.FogExp2(0x000111, 0.0002);

    // Add hemisphere light if not already present
    const existingLight = scene.children.find(
      (child) => child instanceof THREE.HemisphereLight
    );
    if (!existingLight) {
      scene.add(new THREE.HemisphereLight(0xffffff, 0x555555, 1.0));
    }
  }, [camera, scene, size]);

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
    const lookAtTarget = new THREE.Vector3(
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
