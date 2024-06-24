import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Puce({ opacity }) {
  const { scene } = useGLTF("/ptitepute1.glb");
  const modelRef = useRef();

  useEffect(() => {
    const normalTexture = new THREE.TextureLoader().load("/puce.jpg");
    // const displacementTexture = new THREE.TextureLoader().load("/puce.jpg");
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.opacity = opacity;
        child.material.color = new THREE.Color(0x0099CC00);
        child.material.normalMap = normalTexture;
        child.material.transparent = true;
        // child.material.displacementMap = displacementTexture;
        child.material.displacementScale = 0.005;
        child.material.needsUpdate = true;
        child.material.normalMap.wrapS = child.material.normalMap.wrapT =
          THREE.RepeatWrapping;
        child.material.normalMap.repeat.set(10, 10);
        // child.material.displacementMap.repeat.set(10, 10);
        child.material.needsUpdate = true;
      }
    });
  }, [scene, opacity]);

  return <primitive object={scene} scale={1} ref={modelRef} />;
}
useGLTF.preload("/ptitepute1.glb");
