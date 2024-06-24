import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Model({ url, color, opacity }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef();

  const normalTexture = new THREE.TextureLoader().load("/8ckF1.jpg");
  const displacementTexture = new THREE.TextureLoader().load("/8ckF1.jpg");

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.opacity = opacity;
        child.material.color = new THREE.Color(color);
        child.material.normalMap = normalTexture;
        child.material.transparent = true;
        child.material.displacementMap = displacementTexture;
        child.material.displacementScale = 0.005;
        child.material.needsUpdate = true;
        child.material.normalMap.wrapS = child.material.normalMap.wrapT =
          THREE.RepeatWrapping;
        child.material.normalMap.repeat.set(10, 10);
        child.material.displacementMap.repeat.set(10, 10);
        child.material.needsUpdate = true;
      }
    });
  }, [scene, normalTexture, displacementTexture, color, opacity]);

  return <primitive object={scene} scale={1} ref={modelRef} />;
  }

